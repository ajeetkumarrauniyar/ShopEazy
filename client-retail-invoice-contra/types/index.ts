export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceTotalAmount: number;
  taxAmount: number;
  discount: number;
  status: "DRAFT" | "PENDING" | "PAID" | "OVERDUE";
  customer: {
    id: string;
    name: string;
    phone: string;
    email?: string;
  };
  items: Array<{
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
  }>;
}

export interface InvoiceItem {
  quantity: number;
  price: number;
  taxRate: number;
  total: number;
}
