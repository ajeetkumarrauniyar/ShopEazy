import { sql } from "drizzle-orm";
import { db } from "./db";

export async function initializeDatabase() {
  try {
    // Run the migration SQL
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

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// Call this function to ensure database is initialized
export async function ensureDatabaseInitialized() {
  try {
    // Check if tables exist by querying them
    await db.run(sql`SELECT 1 FROM invoices LIMIT 1`);
    console.log("Database already initialized");
  } catch (error) {
    // Tables don't exist, initialize them
    console.log("Initializing database...");
    await initializeDatabase();
  }
} 