import { relations, sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Main invoices table
export const invoicesTable = sqliteTable("invoices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  invoiceNumber: text("invoice_number").notNull().unique(),
  invoiceDate: text("invoice_date").notNull(),
  saleType: text("sale_type").notNull(), // "B2C" or "B2B"
  customerName: text("customer_name").notNull(),
  customerGstin: text("customer_gstin"),
  customerStation: text("customer_station"),
  subtotal: real("subtotal").notNull(),
  taxAmount: real("tax_amount").notNull(),
  taxRate: real("tax_rate").notNull(),
  totalAmount: real("total_amount").notNull(),
  isSynced: integer("synced", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

// Invoice items table (line items/products)
export const invoiceItemsTable = sqliteTable("invoice_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  invoiceId: integer("invoice_id").notNull().references(() => invoicesTable.id, { onDelete: "cascade" }),
  productId: text("product_id"), // Can be null for manually entered products
  productName: text("product_name").notNull(),
  quantity: real("quantity").notNull(),
  rate: real("rate").notNull(),
  amount: real("amount").notNull(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

// Define relations
export const invoicesRelations = relations(invoicesTable, ({ many }) => ({
  items: many(invoiceItemsTable),
}));

export const invoiceItemsRelations = relations(invoiceItemsTable, ({ one }) => ({
  invoice: one(invoicesTable, {
    fields: [invoiceItemsTable.invoiceId],
    references: [invoicesTable.id],
  }),
}));

export const syncQueue = sqliteTable("sync_queue", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tableName: text("table_name").notNull(),
  rowId: integer("row_id").notNull(),
  action: text("action").notNull(),
  payload: text("payload").notNull(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  retryCount: integer("retry_count").default(0),
  lastError: text("last_error"),
});

// Add type exports for better TypeScript support
export type Invoice = typeof invoicesTable.$inferSelect;
export type NewInvoice = typeof invoicesTable.$inferInsert;
export type InvoiceItem = typeof invoiceItemsTable.$inferSelect;
export type NewInvoiceItem = typeof invoiceItemsTable.$inferInsert;
export type SyncQueueItem = typeof syncQueue.$inferSelect;
export type NewSyncQueueItem = typeof syncQueue.$inferInsert;

// Helper type for invoice with items
export type InvoiceWithItems = Invoice & {
  items: InvoiceItem[];
};
