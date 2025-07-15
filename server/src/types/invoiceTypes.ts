import { InvoiceType, PaymentMode, PaymentStatus } from "@prisma/client";

export interface InvoiceItemInput {
  itemId: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
  hsnCode: string;
  cgstPercentage: number;
  cgstAmount: number;
  sgstPercentage: number;
  sgstAmount: number;
  igstPercentage: number;
  igstAmount: number;
}

export interface InvoiceRequestBody {
  invoiceType: InvoiceType;
  invoiceDate: string;
  dueDate: string;
  partyName: string;
  partyGstin: string;
  billingAddress: string;
  shippingAddress: string;
  partyState: string;
  stateCode: string;
  items: InvoiceItemInput[];
  paymentMode?: PaymentMode;
  paymentStatus?: PaymentStatus;
}

// Mobile App Sync Types
export interface MobileInvoiceLineItem {
  productId?: string;
  productName: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface MobileInvoiceData {
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
  lineItems: MobileInvoiceLineItem[];
}

export interface MobileSyncRequest {
  invoice: MobileInvoiceData;
  items: MobileInvoiceLineItem[];
}

export interface MobileSyncQueueItem {
  tableName: string;
  rowId: number;
  action: "INSERT" | "UPDATE" | "DELETE";
  payload: string; // JSON stringified MobileSyncRequest
}

export interface MobileSyncBatchRequest {
  operations: MobileSyncQueueItem[];
}

export interface MobileSyncResponse {
  success: boolean;
  message: string;
  syncedItems: number;
  errors: Array<{
    operation: MobileSyncQueueItem;
    error: string;
  }>;
}
