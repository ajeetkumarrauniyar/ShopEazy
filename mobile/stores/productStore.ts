import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface Product {
  id: string;
  name: string;
  defaultRate: number;
  category?: string;
  unit?: string;
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string | null;

  // Actions
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;

  // Computed
  getFilteredProducts: () => Product[];
  getCategories: () => string[];

  reset: () => void;
}

export const useProductsStore = create<ProductsState>()(
  devtools(
    persist(
      (set, get) => ({
        products: [
          { id: "1", name: "Rice (1kg)", defaultRate: 45, category: "Grains" },
          { id: "2", name: "Wheat Flour (1kg)", defaultRate: 32, category: "Grains" },
          { id: "3", name: "Sugar (1kg)", defaultRate: 38, category: "Sweeteners" },
          { id: "4", name: "Tea (250g)", defaultRate: 85, category: "Beverages" },
          { id: "5", name: "Oil (1L)", defaultRate: 120, category: "Cooking Essentials" },
          { id: "6", name: "Dal (1kg)", defaultRate: 110, category: "Pulses" },
          { id: "7", name: "Salt (1kg)", defaultRate: 18, category: "Cooking Essentials" },
          { id: "8", name: "Onion (1kg)", defaultRate: 35, category: "Vegetables" },
        ],
        isLoading: false,
        searchQuery: "",
        selectedCategory: null,

        setProducts: (products) => set({ products }, false, "setProducts"),
        addProduct: (product) =>
          set(
            (state) => ({ products: [...state.products, product] }),
            false,
            "addProduct"
          ),
        updateProduct: (id, updatedProduct) =>
          set(
            (state) => ({
              products: state.products.map((p) =>
                p.id === id ? { ...p, ...updatedProduct } : p
              ),
            }),
            false,
            "updateProduct"
          ),
        removeProduct: (id) =>
          set(
            (state) => ({
              products: state.products.filter((p) => p.id !== id),
            }),
            false,
            "removeProduct"
          ),
        setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),
        setSearchQuery: (searchQuery) =>
          set({ searchQuery }, false, "setSearchQuery"),
        setSelectedCategory: (selectedCategory) =>
          set({ selectedCategory }, false, "setSelectedCategory"),

        getFilteredProducts: () => {
          const { products, searchQuery, selectedCategory } = get();
          return products.filter((product) => {
            const matchesSearch = product.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
            const matchesCategory =
              !selectedCategory || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
          });
        },

        getCategories: () => {
          const { products } = get();
          const categories = new Set(
            products.map((p) => p.category).filter(Boolean)
          );
          return Array.from(categories) as string[];
        },

        reset: () =>
          set(
            { searchQuery: "", selectedCategory: null },
            false,
            "reset"
          ),
      }),
      {
        name: "products-store",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
); 