import { retryDbOperation, retryDbTransaction } from "@/utils/databaseUtils";
import { desc, eq } from "drizzle-orm";
import { db } from "../db/db";
import {
  invoiceItemsTable,
  invoicesTable,
  syncQueue,
  type InvoiceWithItems,
  type NewInvoice,
  type NewInvoiceItem,
  type NewSyncQueueItem,
} from "../db/schema";

// Get all invoices with their items
export async function getAllInvoicesWithItems(): Promise<InvoiceWithItems[]> {
  return retryDbOperation(async () => {
    const invoices = await db.query.invoicesTable.findMany({
      with: {
        items: true,
      },
      orderBy: [desc(invoicesTable.createdAt)],
    });

    return invoices;
  });
}

// Get a single invoice with items by ID
export async function getInvoiceWithItems(
  invoiceId: number
): Promise<InvoiceWithItems | undefined> {
  return retryDbOperation(async () => {
    const invoice = await db.query.invoicesTable.findFirst({
      where: eq(invoicesTable.id, invoiceId),
      with: {
        items: true,
      },
    });

    return invoice;
  });
}

// Save a new invoice with line items
export async function saveInvoice(invoiceData: {
  invoiceNumber: string;
  invoiceDate: string;
  saleType: "B2C" | "B2B";
  customerName: string;
  customerGstin?: string;
  customerStation?: string;
  subtotal: number;
  taxAmount: number;
  taxRate: number;
  totalAmount: number;
  lineItems: {
    productId?: string;
    productName: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
}): Promise<number> {
  // Use retryDbTransaction for transaction operations
  return retryDbTransaction(async () => {
    // Create timestamp for consistent timing
    const now = new Date().toISOString();

    // Use a transaction to ensure atomicity
    return await db.transaction(async (tx) => {
      // Insert the main invoice
      const invoiceInsert: NewInvoice = {
        invoiceNumber: invoiceData.invoiceNumber,
        invoiceDate: invoiceData.invoiceDate,
        saleType: invoiceData.saleType,
        customerName: invoiceData.customerName,
        customerGstin: invoiceData.customerGstin || null,
        customerStation: invoiceData.customerStation || null,
        subtotal: invoiceData.subtotal,
        taxAmount: invoiceData.taxAmount,
        taxRate: invoiceData.taxRate,
        totalAmount: invoiceData.totalAmount,
        isSynced: false,
        createdAt: now,
        updatedAt: now,
      };

      const [invoice] = await tx
        .insert(invoicesTable)
        .values(invoiceInsert)
        .returning();

      if (!invoice.id) {
        throw new Error("Failed to create invoice");
      }

      // Insert line items in the same transaction
      const itemInserts: NewInvoiceItem[] = invoiceData.lineItems.map(
        (item) => ({
          invoiceId: invoice.id!,
          productId: item.productId || null,
          productName: item.productName,
          quantity: item.quantity,
          rate: item.rate,
          amount: item.amount,
          createdAt: now,
        })
      );

      await tx.insert(invoiceItemsTable).values(itemInserts);

      // Add to sync queue in the same transaction
      const queueItem: NewSyncQueueItem = {
        tableName: "invoices",
        rowId: invoice.id!,
        action: "INSERT",
        payload: JSON.stringify({
          invoice: invoiceInsert,
          items: itemInserts,
        }),
      };

      await tx.insert(syncQueue).values(queueItem);

      console.log(
        `Invoice ${invoiceData.invoiceNumber} saved successfully with ID: ${invoice.id}`
      );

      return invoice.id;
    });
  });
}

// Get the next invoice number
export async function getNextInvoiceNumber(): Promise<string> {
  return retryDbOperation(async () => {
    const lastInvoice = await db
      .select({ invoiceNumber: invoicesTable.invoiceNumber })
      .from(invoicesTable)
      .orderBy(desc(invoicesTable.id))
      .limit(1);

    if (lastInvoice.length === 0) {
      // First invoice
      const year = new Date().getFullYear();
      return `INV-${year}-0001`;
    }

    // Extract number from last invoice and increment
    const lastNumber = lastInvoice[0].invoiceNumber;
    const match = lastNumber.match(/INV-(\d{4})-(\d{4})/);

    if (match) {
      const year = new Date().getFullYear();
      const lastYear = parseInt(match[1]);
      const lastSequence = parseInt(match[2]);

      if (year === lastYear) {
        // Same year, increment sequence
        const newSequence = lastSequence + 1;
        return `INV-${year}-${newSequence.toString().padStart(4, "0")}`;
      } else {
        // New year, reset sequence
        return `INV-${year}-0001`;
      }
    }

    // Fallback to random number if pattern doesn't match
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    return `INV-${year}-${randomNum.toString().padStart(4, "0")}`;
  });
}

// Delete an invoice and its items
export async function deleteInvoice(invoiceId: number): Promise<void> {
  // Use retryDbTransaction for transaction operations
  return retryDbTransaction(async () => {
    // Use a transaction to ensure atomicity
    await db.transaction(async (tx) => {
      // Delete the invoice (items will be deleted due to cascade)
      await tx.delete(invoicesTable).where(eq(invoicesTable.id, invoiceId));
    });

    console.log(`Invoice with ID ${invoiceId} deleted successfully`);
  });
}

// Update invoice sync status
export async function markInvoiceAsSynced(invoiceId: number): Promise<void> {
  return retryDbOperation(async () => {
    await db
      .update(invoicesTable)
      .set({ isSynced: true, updatedAt: new Date().toISOString() })
      .where(eq(invoicesTable.id, invoiceId));
  });
}
