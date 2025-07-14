import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface AppState {
  // App-wide UI state 
  isInitialized: boolean;

  // Theme and preferences
  isDarkMode: boolean;
  language: string;

  // Navigation state
  activeTab: string;

  // Sync status 
  syncProgress: number;

  // Actions
  setInitialized: (isInitialized: boolean) => void;
  setDarkMode: (isDark: boolean) => void;
  setLanguage: (language: string) => void;
  setActiveTab: (tab: string) => void;
  setSyncProgress: (progress: number) => void;

  // Reset
  reset: () => void;
}

const initialState = {
  isInitialized: false,
  isDarkMode: false,
  language: "en",
  activeTab: "dashboard",
  syncProgress: 0,
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setInitialized: (isInitialized) =>
          set({ isInitialized }, false, "setInitialized"),
        setDarkMode: (isDarkMode) => set({ isDarkMode }, false, "setDarkMode"),
        setLanguage: (language) => set({ language }, false, "setLanguage"),
        setActiveTab: (activeTab) => set({ activeTab }, false, "setActiveTab"),
        setSyncProgress: (syncProgress) =>
          set({ syncProgress }, false, "setSyncProgress"),

        reset: () => set(initialState, false, "reset"),
      }),
      {
        name: "app-store",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          // Persist user preferences
          isDarkMode: state.isDarkMode,
          language: state.language,
        }),
      }
    ),
    {
      name: "app-store",
    }
  )
);
