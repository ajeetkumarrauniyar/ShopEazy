import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface OfflineOperation {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: 'invoice' | 'settings' | 'product';
  data: any;
  timestamp: number;
  retryCount: number;
}

interface NetworkState {
  // Network status
  isOnline: boolean;
  isConnected: boolean;
  connectionType: string | null;
  
  // Offline operations queue
  pendingOperations: OfflineOperation[];
  
  // Sync status
  isSyncing: boolean;
  lastSyncTime: string | null;
  syncError: string | null;
  
  // Actions
  setOnlineStatus: (isOnline: boolean) => void;
  setConnectionInfo: (isConnected: boolean, connectionType: string | null) => void;
  
  // Offline operations
  addOfflineOperation: (operation: Omit<OfflineOperation, 'id' | 'timestamp' | 'retryCount'>) => void;
  removeOfflineOperation: (operationId: string) => void;
  incrementRetryCount: (operationId: string) => void;
  clearOfflineOperations: () => void;
  
  // Sync operations
  setSyncing: (isSyncing: boolean) => void;
  setLastSyncTime: (time: string) => void;
  setSyncError: (error: string | null) => void;
  
  // Computed
  hasPendingOperations: () => boolean;
  getPendingOperationsCount: () => number;
  
  // Reset
  reset: () => void;
}

const initialState = {
  isOnline: true,
  isConnected: true,
  connectionType: null,
  pendingOperations: [],
  isSyncing: false,
  lastSyncTime: null,
  syncError: null,
};

export const useNetworkStore = create<NetworkState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setOnlineStatus: (isOnline) => 
          set({ isOnline }, false, "setOnlineStatus"),
          
        setConnectionInfo: (isConnected, connectionType) =>
          set({ 
            isConnected, 
            connectionType,
            isOnline: isConnected 
          }, false, "setConnectionInfo"),

        addOfflineOperation: (operation) => {
          const newOperation: OfflineOperation = {
            ...operation,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            retryCount: 0,
          };
          
          set(
            (state) => ({
              pendingOperations: [...state.pendingOperations, newOperation],
            }),
            false,
            "addOfflineOperation"
          );
        },

        removeOfflineOperation: (operationId) =>
          set(
            (state) => ({
              pendingOperations: state.pendingOperations.filter(op => op.id !== operationId),
            }),
            false,
            "removeOfflineOperation"
          ),

        incrementRetryCount: (operationId) =>
          set(
            (state) => ({
              pendingOperations: state.pendingOperations.map(op =>
                op.id === operationId ? { ...op, retryCount: op.retryCount + 1 } : op
              ),
            }),
            false,
            "incrementRetryCount"
          ),

        clearOfflineOperations: () =>
          set({ pendingOperations: [] }, false, "clearOfflineOperations"),

        setSyncing: (isSyncing) =>
          set({ isSyncing }, false, "setSyncing"),

        setLastSyncTime: (lastSyncTime) =>
          set({ lastSyncTime }, false, "setLastSyncTime"),

        setSyncError: (syncError) =>
          set({ syncError }, false, "setSyncError"),

        hasPendingOperations: () => {
          const { pendingOperations } = get();
          return pendingOperations.length > 0;
        },

        getPendingOperationsCount: () => {
          const { pendingOperations } = get();
          return pendingOperations.length;
        },

        reset: () => set(initialState, false, "reset"),
      }),
      {
        name: "network-store",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          // Persist offline operations and sync status
          pendingOperations: state.pendingOperations,
          lastSyncTime: state.lastSyncTime,
        }),
      }
    ),
    {
      name: "network-store",
    }
  )
);

// Initialize network monitoring
let networkUnsubscribe: (() => void) | null = null;

export const initializeNetworkMonitoring = () => {
  if (networkUnsubscribe) {
    networkUnsubscribe();
  }

  networkUnsubscribe = NetInfo.addEventListener(state => {
    const store = useNetworkStore.getState();
    store.setConnectionInfo(
      state.isConnected ?? false,
      state.type
    );
  });

  return () => {
    if (networkUnsubscribe) {
      networkUnsubscribe();
      networkUnsubscribe = null;
    }
  };
};

// Auto-sync when coming back online
export const setupAutoSync = (syncFunction: () => Promise<void>) => {
  const unsubscribe = useNetworkStore.subscribe(
    (state) => state.isOnline,
    (isOnline, prevIsOnline) => {
      // When coming back online and we have pending operations
      if (isOnline && !prevIsOnline && useNetworkStore.getState().hasPendingOperations()) {
        console.log("📶 Back online, syncing pending operations...");
        syncFunction().catch(error => {
          console.error("Auto-sync failed:", error);
          useNetworkStore.getState().setSyncError(error.message);
        });
      }
    }
  );

  return unsubscribe;
}; 