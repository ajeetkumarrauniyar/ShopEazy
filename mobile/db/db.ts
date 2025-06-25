import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

const expoDb = openDatabaseSync("ruralledger.db");

export const db = drizzle(expoDb, { schema });

// Re-export schema for convenience
export type { Invoice, InvoiceItem, InvoiceWithItems, NewInvoice, NewInvoiceItem } from "./schema";
export { schema };

