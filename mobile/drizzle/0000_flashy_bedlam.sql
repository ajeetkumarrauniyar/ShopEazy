CREATE TABLE `invoice_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`invoice_id` integer NOT NULL,
	`product_id` text,
	`product_name` text NOT NULL,
	`quantity` real NOT NULL,
	`rate` real NOT NULL,
	`amount` real NOT NULL,
	`created_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`invoice_number` text NOT NULL,
	`invoice_date` text NOT NULL,
	`sale_type` text NOT NULL,
	`customer_name` text NOT NULL,
	`customer_gstin` text,
	`customer_station` text,
	`subtotal` real NOT NULL,
	`tax_amount` real NOT NULL,
	`tax_rate` real NOT NULL,
	`total_amount` real NOT NULL,
	`synced` integer DEFAULT false,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `invoices_invoice_number_unique` ON `invoices` (`invoice_number`);--> statement-breakpoint
CREATE TABLE `sync_queue` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`table_name` text NOT NULL,
	`row_id` integer NOT NULL,
	`action` text NOT NULL,
	`payload` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')),
	`retry_count` integer DEFAULT 0,
	`last_error` text
);
