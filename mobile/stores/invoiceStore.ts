import type { InvoiceWithItems } from "@/db/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface InvoiceState {
  // Invoice data
  invoices: InvoiceWithItems[];
  currentInvoice: InvoiceWithItems | null;

  // UI state (remove loading alias, keep only isLoading)
  isLoading: boolean;
  error: string | null;

  // Filters and search
  searchQuery: string;
  filterType: "all" | "synced" | "pending";

  // Actions
  setInvoices: (invoices: InvoiceWithItems[]) => void;
  addInvoice: (invoice: InvoiceWithItems) => void;
  updateInvoice: (id: number, invoice: Partial<InvoiceWithItems>) => void;
  removeInvoice: (id: number) => void;
  setCurrentInvoice: (invoice: InvoiceWithItems | null) => void;

  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (type: "all" | "synced" | "pending") => void;

  // Computed values
  getFilteredInvoices: () => InvoiceWithItems[];
  getTotalRevenue: () => number;
  getPendingCount: () => number;
  getSyncedCount: () => number;

  // Reset
  reset: () => void;
}

const initialState = {
  invoices: [],
  currentInvoice: null,
  isLoading: false,
  error: null,
  searchQuery: "",
  filterType: "all" as const,
};

export const useInvoiceStore = create<InvoiceState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Data actions
        setInvoices: (invoices) => set({ invoices }, false, "setInvoices"),

        addInvoice: (invoice) =>
          set(
            (state) => ({
              invoices: [invoice, ...state.invoices],
            }),
            false,
            "addInvoice"
          ),

        updateInvoice: (id, updatedInvoice) =>
          set(
            (state) => ({
              invoices: state.invoices.map((invoice) =>
                invoice.id === id ? { ...invoice, ...updatedInvoice } : invoice
              ),
              currentInvoice:
                state.currentInvoice?.id === id
                  ? { ...state.currentInvoice, ...updatedInvoice }
                  : state.currentInvoice,
            }),
            false,
            "updateInvoice"
          ),

        removeInvoice: (id) =>
          set(
            (state) => ({
              invoices: state.invoices.filter((invoice) => invoice.id !== id),
              currentInvoice:
                state.currentInvoice?.id === id ? null : state.currentInvoice,
            }),
            false,
            "removeInvoice"
          ),

        setCurrentInvoice: (invoice) =>
          set({ currentInvoice: invoice }, false, "setCurrentInvoice"),

        // UI actions (simplified - only update isLoading)
        setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),
        setError: (error) => set({ error }, false, "setError"),
        setSearchQuery: (searchQuery) =>
          set({ searchQuery }, false, "setSearchQuery"),
        setFilterType: (filterType) =>
          set({ filterType }, false, "setFilterType"),

        // Computed values
        getFilteredInvoices: () => {
          const { invoices, searchQuery, filterType } = get();
          let filtered = [...invoices];

          // Apply filter type
          if (filterType === "synced") {
            filtered = filtered.filter((invoice) => invoice.isSynced);
          } else if (filterType === "pending") {
            filtered = filtered.filter((invoice) => !invoice.isSynced);
          }

          // Apply search query
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
              (invoice) =>
                invoice.invoiceNumber.toLowerCase().includes(query) ||
                invoice.customerName.toLowerCase().includes(query) ||
                invoice.saleType.toLowerCase().includes(query)
            );
          }

          return filtered;
        },

        getTotalRevenue: () => {
          const { invoices } = get();
          return invoices.reduce(
            (sum, invoice) => sum + invoice.totalAmount,
            0
          );
        },

        getPendingCount: () => {
          const { invoices } = get();
          return invoices.filter((invoice) => !invoice.isSynced).length;
        },

        getSyncedCount: () => {
          const { invoices } = get();
          return invoices.filter((invoice) => invoice.isSynced).length;
        },

        // Reset
        reset: () => set(initialState, false, "reset"),
      }),
      {
        name: "invoice-store",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          // Only persist essential data, not UI state
          invoices: state.invoices,
          currentInvoice: state.currentInvoice,
        }),
      }
    ),
    {
      name: "invoice-store",
    }
  )
);
