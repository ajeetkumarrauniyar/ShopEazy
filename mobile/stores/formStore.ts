import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LineItem {
  id: string;
  productName: string;
  quantity: string;
  rate: string;
  amount: number;
}

interface FormState {
  // Invoice form data
  saleType: "B2C" | "B2B";
  partyName: string;
  partyGstin: string;
  invoiceNumber: string;
  invoiceDate: Date;
  lineItems: LineItem[];

  // Form validation
  errors: Record<string, string>;
  isValid: boolean;

  // UI state
  isSubmitting: boolean;
  loading: boolean;
  showProductModal: boolean;
  selectedItemIndex: number;
  productSearchQuery: string;

  // Actions
  setSaleType: (type: "B2C" | "B2B") => void;
  setPartyName: (name: string) => void;
  setPartyGstin: (gstin: string) => void;
  setInvoiceNumber: (number: string) => void;
  setInvoiceDate: (date: Date) => void;
  setLineItems: (items: LineItem[]) => void;
  addLineItem: () => void;
  removeLineItem: (id: string) => void;
  updateLineItem: (id: string, field: keyof LineItem, value: string) => void;

  // Validation
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  clearAllErrors: () => void;
  validateForm: () => boolean;

  // UI actions
  setSubmitting: (isSubmitting: boolean) => void;
  setLoading: (loading: boolean) => void;
  setShowProductModal: (show: boolean) => void;
  setSelectedItemIndex: (index: number) => void;
  setProductSearchQuery: (query: string) => void;

  // Computed values
  getSubtotal: () => number;
  getTaxAmount: () => number;
  getTotal: () => number;

  // Reset
  resetForm: () => void;
}

const createEmptyLineItem = (): LineItem => ({
  id: Date.now().toString(),
  productName: "",
  quantity: "",
  rate: "",
  amount: 0,
});

const initialState = {
  saleType: "B2C" as const,
  partyName: "CASH",
  partyGstin: "",
  invoiceNumber: "",
  invoiceDate: new Date(),
  lineItems: [createEmptyLineItem()],
  errors: {},
  isValid: false,
  isSubmitting: false,
  loading: false,
  showProductModal: false,
  selectedItemIndex: 0,
  productSearchQuery: "",
};

export const useFormStore = create<FormState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Data actions
      setSaleType: (saleType) =>
        set(
          (state) => ({
            saleType,
            partyName: saleType === "B2C" ? "CASH" : "",
            partyGstin: saleType === "B2C" ? "" : state.partyGstin,
          }),
          false,
          "setSaleType"
        ),

      setPartyName: (partyName) => set({ partyName }, false, "setPartyName"),
      setPartyGstin: (partyGstin) =>
        set({ partyGstin }, false, "setPartyGstin"),
      setInvoiceNumber: (invoiceNumber) =>
        set({ invoiceNumber }, false, "setInvoiceNumber"),
      setInvoiceDate: (invoiceDate) =>
        set({ invoiceDate }, false, "setInvoiceDate"),
      setLineItems: (lineItems) => set({ lineItems }, false, "setLineItems"),

      addLineItem: () =>
        set(
          (state) => ({
            lineItems: [...state.lineItems, createEmptyLineItem()],
          }),
          false,
          "addLineItem"
        ),

      removeLineItem: (id) =>
        set(
          (state) => ({
            lineItems:
              state.lineItems.length > 1
                ? state.lineItems.filter((item) => item.id !== id)
                : state.lineItems,
          }),
          false,
          "removeLineItem"
        ),

      updateLineItem: (id, field, value) =>
        set(
          (state) => ({
            lineItems: state.lineItems.map((item) => {
              if (item.id === id) {
                const updatedItem = { ...item, [field]: value };

                // Calculate amount when quantity or rate changes
                if (field === "quantity" || field === "rate") {
                  const quantity =
                    parseFloat(field === "quantity" ? value : item.quantity) ||
                    0;
                  const rate =
                    parseFloat(field === "rate" ? value : item.rate) || 0;
                  updatedItem.amount = quantity * rate;
                }

                return updatedItem;
              }
              return item;
            }),
          }),
          false,
          "updateLineItem"
        ),

      // Validation
      setError: (field, error) =>
        set(
          (state) => ({
            errors: { ...state.errors, [field]: error },
          }),
          false,
          "setError"
        ),

      clearError: (field) =>
        set(
          (state) => {
            const { [field]: _, ...rest } = state.errors;
            return { errors: rest };
          },
          false,
          "clearError"
        ),

      clearAllErrors: () => set({ errors: {} }, false, "clearAllErrors"),

      validateForm: () => {
        const state = get();
        const errors: Record<string, string> = {};

        // Validate party name
        if (!state.partyName.trim()) {
          errors.partyName = "Party name is required";
        }

        // Validate GSTIN for B2B
        if (state.saleType === "B2B" && !state.partyGstin.trim()) {
          errors.partyGstin = "GSTIN is required for B2B sales";
        }

        // Validate line items
        const hasValidItems = state.lineItems.some(
          (item) => item.productName && item.quantity && item.rate
        );

        if (!hasValidItems) {
          errors.lineItems = "At least one line item is required";
        }

        set({ errors }, false, "validateForm");
        return Object.keys(errors).length === 0;
      },

      // UI actions
      setSubmitting: (isSubmitting) =>
        set({ isSubmitting }, false, "setSubmitting"),
      setLoading: (loading) => set({ loading }, false, "setLoading"),
      setShowProductModal: (showProductModal) =>
        set({ showProductModal }, false, "setShowProductModal"),
      setSelectedItemIndex: (selectedItemIndex) =>
        set({ selectedItemIndex }, false, "setSelectedItemIndex"),
      setProductSearchQuery: (productSearchQuery) =>
        set({ productSearchQuery }, false, "setProductSearchQuery"),

      // Computed values
      getSubtotal: () => {
        const { lineItems } = get();
        return lineItems.reduce((sum, item) => sum + item.amount, 0);
      },

      getTaxAmount: () => {
        const { saleType } = get();
        const subtotal = get().getSubtotal();
        const taxRate = saleType === "B2B" ? 18 : 0;
        return subtotal * (taxRate / 100);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const taxAmount = get().getTaxAmount();
        return subtotal + taxAmount;
      },

      // Reset
      resetForm: () => set({
        ...initialState,
        invoiceDate: new Date(),
        lineItems: [createEmptyLineItem()],
      }, false, "resetForm"),
    }),
    {
      name: "form-store",
    }
  )
);
