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
