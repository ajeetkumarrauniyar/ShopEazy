/**
 * Database utility functions to prevent locks and manage operations
 */

import { sql } from "drizzle-orm";

// Simple queue to prevent concurrent database operations
class DatabaseQueue {
  private queue: Array<() => Promise<any>> = [];
  private isProcessing = false;

  async enqueue<T>(operation: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await operation();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const operation = this.queue.shift();
      if (operation) {
        try {
          await operation();
          // Small delay between operations to prevent locks
          await new Promise((resolve) => setTimeout(resolve, 10));
        } catch (error) {
          console.error("Database operation failed:", error);
        }
      }
    }

    this.isProcessing = false;
  }
}

export const dbQueue = new DatabaseQueue();

/**
 * Wrapper for database operations to prevent locks
 */
export async function safeDbOperation<T>(
  operation: () => Promise<T>
): Promise<T> {
  return dbQueue.enqueue(operation);
}

/**
 * Check if database is available and properly configured
 */
export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    const { db } = await import("@/db/db");
    // Simple test query that shouldn't interfere with transactions
    await db.run(sql`SELECT 1`);
    return true;
  } catch (error) {
    console.warn("Database not available:", error);
    return false;
  }
}

/**
 * Retry database operation with exponential backoff
 * Use this for simple queries, not transactions
 */
export async function retryDbOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 100
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await safeDbOperation(operation);
    } catch (error) {
      lastError = error as Error;
      console.warn(
        `Database operation failed (attempt ${attempt + 1}/${maxRetries}):`,
        error
      );

      if (attempt < maxRetries - 1) {
        // Exponential backoff delay
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}

/**
 * Retry database transaction with exponential backoff
 * Specialized for transactions - uses longer delays and fewer retries
 */
export async function retryDbTransaction<T>(
  operation: () => Promise<T>,
  maxRetries: number = 2,
  baseDelay: number = 500
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Run transaction directly without queuing to avoid conflicts
      return await operation();
    } catch (error) {
      lastError = error as Error;
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      console.warn(
        `Database transaction failed (attempt ${attempt + 1}/${maxRetries}):`,
        errorMessage
      );

      // Check if it's a specific transaction error we can handle
      if (
        errorMessage.includes("database is locked") ||
        errorMessage.includes("SQLITE_BUSY") ||
        errorMessage.includes("Failed to run the query 'commit'")
      ) {
        if (attempt < maxRetries - 1) {
          // Longer delay for transactions to prevent conflicts
          const delay = baseDelay * Math.pow(2, attempt);
          console.log(`Retrying transaction in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } else {
        // For non-lock related errors, fail immediately
        throw lastError;
      }
    }
  }

  throw lastError!;
}

/**
 * Handle database maintenance tasks
 */
export async function performDatabaseMaintenance(): Promise<void> {
  try {
    const { db, optimizeDatabase } = await import("@/db/db");

    // Optimize query planner statistics
    optimizeDatabase();

    // Checkpoint WAL file periodically
    await db.run(sql`PRAGMA wal_checkpoint(passive);`);

    console.log("✅ Database maintenance completed");
  } catch (error) {
    console.error("❌ Database maintenance failed:", error);
  }
}

/**
 * Get database health metrics
 */
export async function getDatabaseHealth(): Promise<{
  isHealthy: boolean;
  metrics: any;
}> {
  try {
    const { getDatabaseInfo } = await import("@/db/db");
    const metrics = getDatabaseInfo();

    const isHealthy =
      metrics !== null &&
      metrics.journalMode === "wal" &&
      metrics.foreignKeys === 1;

    return { isHealthy, metrics };
  } catch (error) {
    console.error("❌ Failed to get database health:", error);
    return { isHealthy: false, metrics: null };
  }
}
