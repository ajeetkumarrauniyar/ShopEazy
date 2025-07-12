import { sql } from "drizzle-orm";
import { db } from "./db";

/**
 * Clears all data from the SQLite database
 * This function drops all tables and recreates them
 */
export async function clearDatabase() {
  try {
    console.log("🗑️ Clearing SQLite database...");

    // Drop all tables in the correct order (respecting foreign key constraints)
    await db.run(sql`DROP TABLE IF EXISTS sync_queue`);
    await db.run(sql`DROP TABLE IF EXISTS invoice_items`);
    await db.run(sql`DROP TABLE IF EXISTS invoices`);

    console.log("✅ All tables dropped successfully");

    // Recreate tables
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        invoice_number text NOT NULL,
        invoice_date text NOT NULL,
        sale_type text NOT NULL,
        customer_name text NOT NULL,
        customer_gstin text,
        customer_station text,
        subtotal real NOT NULL,
        tax_amount real NOT NULL,
        tax_rate real NOT NULL,
        total_amount real NOT NULL,
        synced integer DEFAULT false,
        created_at text DEFAULT (datetime('now')),
        updated_at text DEFAULT (datetime('now'))
      );
    `);

    await db.run(sql`
      CREATE UNIQUE INDEX IF NOT EXISTS invoices_invoice_number_unique ON invoices (invoice_number);
    `);

    await db.run(sql`
      CREATE TABLE IF NOT EXISTS invoice_items (
        id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        invoice_id integer NOT NULL,
        product_id text,
        product_name text NOT NULL,
        quantity real NOT NULL,
        rate real NOT NULL,
        amount real NOT NULL,
        created_at text DEFAULT (datetime('now')),
        FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON UPDATE no action ON DELETE cascade
      );
    `);

    await db.run(sql`
      CREATE TABLE IF NOT EXISTS sync_queue (
        id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        table_name text NOT NULL,
        row_id integer NOT NULL,
        action text NOT NULL,
        payload text NOT NULL,
        created_at text DEFAULT (datetime('now')),
        retry_count integer DEFAULT 0,
        last_error text
      );
    `);

    console.log("✅ Database tables recreated successfully");
    console.log("🎉 Database cleared and reset complete!");

    return true;
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    throw error;
  }
}

/**
 * Clears only the data from tables without dropping the schema
 * This is a safer option that preserves table structure
 */
export async function clearDatabaseData() {
  try {
    console.log("🗑️ Clearing database data...");

    // Clear data in the correct order (respecting foreign key constraints)
    await db.run(sql`DELETE FROM sync_queue`);
    await db.run(sql`DELETE FROM invoice_items`);
    await db.run(sql`DELETE FROM invoices`);

    // Reset auto-increment counters
    await db.run(sql`DELETE FROM sqlite_sequence WHERE name IN ('invoices', 'invoice_items', 'sync_queue')`);

    console.log("✅ All data cleared successfully");
    console.log("🎉 Database data reset complete!");

    return true;
  } catch (error) {
    console.error("❌ Error clearing database data:", error);
    throw error;
  }
}