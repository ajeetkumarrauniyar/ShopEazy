import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

const expoDb = openDatabaseSync("ruralledger.db");

export const db = drizzle(expoDb, { schema });

// Re-export schema for convenience
export type { Invoice, InvoiceItem, InvoiceWithItems, NewInvoice, NewInvoiceItem } from "./schema";
export { schema };

/**
 * Get database instance for direct operations
 * Use this when you need to perform operations outside of Drizzle ORM
 */
export const getRawDatabase = () => expoDb;

/**
 * Close database connection
 * Call this when the app is shutting down
 */
export const closeDatabase = () => {
  try {
    expoDb.closeSync();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error closing database:", error);
  }
};