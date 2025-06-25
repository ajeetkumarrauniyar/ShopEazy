import { db } from "@/db/db";
import { invoicesTable, syncQueue, type Invoice, type NewSyncQueueItem } from "@/db/schema";
import { eq, lte } from "drizzle-orm";

const MAX_RETRY_COUNT = 3;
const RETRY_DELAY = 1000; // 1 second

// Add item to sync queue
export async function addToSyncQueue(
  tableName: string,
  rowId: number,
  action: 'INSERT' | 'UPDATE' | 'DELETE',
  payload: any
) {
  const queueItem: NewSyncQueueItem = {
    tableName,
    rowId,
    action,
    payload: JSON.stringify(payload),
  };

  await db.insert(syncQueue).values(queueItem);
}

// Process sync queue
export async function processSyncQueue() {
  const queueItems = await db
    .select()
    .from(syncQueue)
    .where(lte(syncQueue.retryCount, MAX_RETRY_COUNT))
    .orderBy(syncQueue.createdAt);

  for (const item of queueItems) {
    try {
      await processQueueItem(item);
      
      // Remove successfully synced item from queue
      await db.delete(syncQueue).where(eq(syncQueue.id, item.id));
      
      // Mark original record as synced if it's an invoice
      if (item.tableName === 'invoices') {
        await db
          .update(invoicesTable)
          .set({ isSynced: true })
          .where(eq(invoicesTable.id, item.rowId));
      }
      
    } catch (error) {
      await handleSyncError(item, error);
    }
  }
}

// Process individual queue item
async function processQueueItem(item: any) {
  const payload = JSON.parse(item.payload);
  
  switch (item.action) {
    case 'INSERT':
      await syncInsert(item.tableName, payload);
      break;
    case 'UPDATE':
      await syncUpdate(item.tableName, item.rowId, payload);
      break;
    case 'DELETE':
      await syncDelete(item.tableName, item.rowId);
      break;
    default:
      throw new Error(`Unknown action: ${item.action}`);
  }
}

// Handle sync errors with retry logic and delay
async function handleSyncError(item: any, error: any) {
  const newRetryCount = item.retryCount + 1;
  
  if (newRetryCount > MAX_RETRY_COUNT) {
    console.error(`Max retries exceeded for sync item ${item.id}:`, error);
    // Could implement dead letter queue here
    return;
  }
  
  // Apply exponential backoff delay
  const delayMs = RETRY_DELAY * Math.pow(2, item.retryCount);
  await new Promise(resolve => setTimeout(resolve, delayMs));
  
  await db
    .update(syncQueue)
    .set({ 
      retryCount: newRetryCount,
      lastError: error.message || 'Unknown error'
    })
    .where(eq(syncQueue.id, item.id));
}

// Sync functions (replace with actual API calls to Express.js backend)
async function syncInsert(tableName: string, data: any) {
  // Replace with actual API call to your Express.js backend
  console.log(`Syncing INSERT for ${tableName}:`, data);
  await simulateApiCall();
}

async function syncUpdate(tableName: string, id: number, data: any) {
  // Replace with actual API call to your Express.js backend
  console.log(`Syncing UPDATE for ${tableName} id ${id}:`, data);
  await simulateApiCall();
}

async function syncDelete(tableName: string, id: number) {
  // Replace with actual API call to your Express.js backend
  console.log(`Syncing DELETE for ${tableName} id ${id}`);
  await simulateApiCall();
}

// Simulate API call (replace with actual implementation)
async function simulateApiCall() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate occasional failures for testing
      if (Math.random() < 0.1) {
        reject(new Error('Simulated network error'));
      } else {
        resolve(true);
      }
    }, 500);
  });
}

// Legacy function for backward compatibility
export async function syncToServer() {
  await processSyncQueue();
}

// Helper function to sync specific invoice
export async function syncInvoice(invoice: Invoice) {
  await addToSyncQueue('invoices', invoice.id!, 'INSERT', invoice);
}

// Clear failed items from queue (for maintenance)
export async function clearFailedSyncItems() {
  await db.delete(syncQueue).where(lte(syncQueue.retryCount, MAX_RETRY_COUNT));
}

// Get sync queue status
export async function getSyncQueueStatus() {
  const total = await db.select().from(syncQueue);
  const failed = await db.select().from(syncQueue).where(lte(syncQueue.retryCount, MAX_RETRY_COUNT));
  
  return {
    totalItems: total.length,
    failedItems: failed.length,
    pendingItems: total.length - failed.length
  };
}
