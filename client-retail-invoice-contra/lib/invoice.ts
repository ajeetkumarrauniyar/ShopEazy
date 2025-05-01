import { useApi } from "../hooks/useApi";

export interface InvoiceCreateDTO {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    discount?: string;
  }>;
  discount?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  totalAmount: number;
  date: string;
  // Add other required fields
}

export const invoiceApi = {
  create: (data: InvoiceCreateDTO) =>
    useApi.post("create-invoice", "/invoices", data),

  getAll: () => useApi.get<Invoice[]>("invoices", "/invoices"),

  getById: (id: string) =>
    useApi.get<Invoice>(`invoice-${id}`, `/invoices/${id}`),
};
