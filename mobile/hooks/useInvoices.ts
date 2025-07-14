import type { InvoiceWithItems } from "@/db/db";
import { ensureDatabaseInitialized } from "@/db/migrate";
import {
  deleteInvoice as deleteInvoiceFromDb,
  getAllInvoicesWithItems,
  saveInvoice,
} from "@/services/invoiceService";
import { useInvoiceStore, useNetworkStore } from "@/stores";
import { useCallback, useEffect } from "react";

// Extend the invoice interface for UI states
interface ExtendedInvoiceWithItems extends InvoiceWithItems {
  pendingDeletion?: boolean;
}

/**
 * Custom hook for managing invoice operations with Zustand store,
 * optimistic updates, and offline support
 */
export const useInvoices = () => {
  const invoiceStore = useInvoiceStore();
  const networkStore = useNetworkStore();

  // Load invoices from database on mount
  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = useCallback(async () => {
    invoiceStore.setLoading(true);
    try {
      await ensureDatabaseInitialized();
      const invoices = await getAllInvoicesWithItems();
      invoiceStore.setInvoices(invoices);
    } catch (error) {
      invoiceStore.setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      invoiceStore.setLoading(false);
    }
  }, [invoiceStore]);

  // Optimistic invoice creation
  const createInvoiceOptimistic = useCallback(async (invoiceData: any) => {
    // Generate temporary ID for optimistic update
    const tempId = Date.now();
    const optimisticInvoice: InvoiceWithItems = {
      ...invoiceData,
      id: tempId,
      isSynced: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      // 1. Optimistic update - add to store immediately
      invoiceStore.addInvoice(optimisticInvoice);

      if (networkStore.isOnline) {
        // 2. Try to save to database
        const realId = await saveInvoice(invoiceData);
        
        // 3. Update with real ID and mark as synced
        invoiceStore.updateInvoice(tempId, { 
          id: realId, 
          isSynced: true 
        });
        
        console.log("✅ Invoice created and synced:", realId);
      } else {
        // 4. If offline, queue the operation
        networkStore.addOfflineOperation({
          type: 'CREATE',
          entity: 'invoice',
          data: { ...invoiceData, tempId },
        });
        
        console.log("📱 Invoice created offline, queued for sync");
      }

      return optimisticInvoice;
    } catch (error) {
      // 5. Rollback optimistic update on error
      invoiceStore.removeInvoice(tempId);
      invoiceStore.setError(error instanceof Error ? error.message : "Failed to create invoice");
      throw error;
    }
  }, [invoiceStore, networkStore]);

  // Optimistic invoice deletion
  const deleteInvoiceOptimistic = useCallback(async (invoiceId: number) => {
    // Prevent concurrent deletes on the same invoice
    if (invoiceStore.isLoading) {
      console.log("🔒 Delete operation already in progress, skipping...");
      return;
    }

    try {
      // 1. Get the invoice for potential rollback
      const invoice = invoiceStore.invoices.find(inv => inv.id === invoiceId);
      if (!invoice) {
        throw new Error("Invoice not found");
      }

      // 2. Set loading state to prevent concurrent operations
      invoiceStore.setLoading(true);
      invoiceStore.setError(null);

      // 3. Optimistic update - remove from store immediately
      invoiceStore.removeInvoice(invoiceId);

      if (networkStore.isOnline) {
        // 4. Try to delete from database with a small delay to prevent rapid-fire
        await new Promise(resolve => setTimeout(resolve, 100));
        await deleteInvoiceFromDb(invoiceId);
        console.log("✅ Invoice deleted and synced:", invoiceId);
      } else {
        // 5. If offline, queue the operation and mark for pending deletion
        networkStore.addOfflineOperation({
          type: 'DELETE',
          entity: 'invoice',
          data: { invoiceId },
        });
        
        // Re-add invoice but mark as pending deletion for UI feedback
        const pendingInvoice = { ...invoice, isSynced: false };
        invoiceStore.addInvoice(pendingInvoice);
        
        console.log("📱 Invoice deletion queued for sync");
      }
    } catch (err) {
      console.error("Error deleting invoice:", err);
      
      // 6. Rollback optimistic update - restore the invoice
      const originalInvoice = invoiceStore.invoices.find(inv => inv.id === invoiceId);
      if (!originalInvoice) {
        // If invoice wasn't in store, reload from database
        console.log("🔄 Reloading invoices after failed delete...");
        await loadInvoices();
      }
      
      invoiceStore.setError("Failed to delete invoice");
      throw err;
    } finally {
      // 7. Always clear loading state
      invoiceStore.setLoading(false);
    }
  }, [invoiceStore, networkStore, loadInvoices, deleteInvoiceFromDb]);

  // Optimistic invoice update
  const updateInvoiceOptimistic = useCallback(async (
    invoiceId: number, 
    updates: Partial<InvoiceWithItems>
  ) => {
    try {
      // 1. Get current invoice for rollback
      const currentInvoice = invoiceStore.invoices.find(inv => inv.id === invoiceId);
      if (!currentInvoice) {
        throw new Error("Invoice not found");
      }

      // 2. Optimistic update
      invoiceStore.updateInvoice(invoiceId, { 
        ...updates, 
        isSynced: false,
        updatedAt: new Date().toISOString()
      });

      if (networkStore.isOnline) {
        // 3. Try to sync with database
        // Note: You'll need to implement updateInvoice in your service
        // await updateInvoiceInDb(invoiceId, updates);
        
        // 4. Mark as synced
        invoiceStore.updateInvoice(invoiceId, { isSynced: true });
        console.log("✅ Invoice updated and synced:", invoiceId);
      } else {
        // 4. If offline, queue the operation
        networkStore.addOfflineOperation({
          type: 'UPDATE',
          entity: 'invoice',
          data: { invoiceId, updates },
        });
        
        console.log("📱 Invoice update queued for sync");
      }
    } catch (error) {
      // 5. Rollback on error
      const currentInvoice = invoiceStore.invoices.find(inv => inv.id === invoiceId);
      if (currentInvoice) {
        // Restore previous state
        await loadInvoices();
      }
      
      invoiceStore.setError("Failed to update invoice");
      throw error;
    }
  }, [invoiceStore, networkStore, loadInvoices]);

  // Sync pending operations when online
  const syncPendingOperations = useCallback(async () => {
    if (!networkStore.isOnline || networkStore.isSyncing) {
      return;
    }

    const pendingOps = networkStore.pendingOperations.filter((op: any) => op.entity === 'invoice');
    if (pendingOps.length === 0) {
      return;
    }

    networkStore.setSyncing(true);
    console.log(`🔄 Syncing ${pendingOps.length} pending invoice operations...`);

    for (const operation of pendingOps) {
      try {
        switch (operation.type) {
          case 'CREATE':
            const realId = await saveInvoice(operation.data);
            if (operation.data.tempId) {
              invoiceStore.updateInvoice(operation.data.tempId, { 
                id: realId, 
                isSynced: true 
              });
            }
            break;
            
          case 'DELETE':
            await deleteInvoiceFromDb(operation.data.invoiceId);
            invoiceStore.removeInvoice(operation.data.invoiceId);
            break;
            
          case 'UPDATE':
            // await updateInvoiceInDb(operation.data.invoiceId, operation.data.updates);
            invoiceStore.updateInvoice(operation.data.invoiceId, { 
              ...operation.data.updates,
              isSynced: true 
            });
            break;
        }
        
        networkStore.removeOfflineOperation(operation.id);
        console.log(`✅ Synced ${operation.type} operation for invoice`);
        
      } catch (error) {
        console.error(`❌ Failed to sync ${operation.type} operation:`, error);
        networkStore.incrementRetryCount(operation.id);
        
        // Remove operations that have failed too many times
        if (operation.retryCount >= 3) {
          networkStore.removeOfflineOperation(operation.id);
          console.log(`🗑️ Removed failed operation after 3 retries`);
        }
      }
    }

    networkStore.setSyncing(false);
    networkStore.setLastSyncTime(new Date().toISOString());
    console.log("🎉 Sync completed");
  }, [networkStore, invoiceStore]);

  const refreshInvoices = useCallback(async () => {
    await loadInvoices();
    if (networkStore.isOnline) {
      await syncPendingOperations();
    }
  }, [loadInvoices, syncPendingOperations, networkStore]);

  // Computed values
  const filteredInvoices = invoiceStore.getFilteredInvoices();
  const totalRevenue = invoiceStore.getTotalRevenue();
  const pendingCount = invoiceStore.getPendingCount();
  const syncedCount = invoiceStore.getSyncedCount();

  const stats = {
    totalInvoices: invoiceStore.invoices.length,
    totalRevenue,
    pendingInvoices: pendingCount,
    syncedInvoices: syncedCount,
  };

  return {
    ...invoiceStore,
    
    // Enhanced methods with optimistic updates
    createInvoice: createInvoiceOptimistic,
    deleteInvoice: deleteInvoiceOptimistic,
    updateInvoice: updateInvoiceOptimistic,
    
    // Network-aware methods
    filteredInvoices,
    stats,
    loadInvoices,
    refreshInvoices,
    syncPendingOperations,
    
    // Network status
    isOnline: networkStore.isOnline,
    isSyncing: networkStore.isSyncing,
    hasPendingOperations: networkStore.hasPendingOperations(),
    pendingOperationsCount: networkStore.getPendingOperationsCount(),
    lastSyncTime: networkStore.lastSyncTime,
    syncError: networkStore.syncError,
  };
};
