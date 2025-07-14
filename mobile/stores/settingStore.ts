import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface SettingsState {
  // Personal Information
  personalInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };

  // Business Information
  businessInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };

  // App Settings
  appSettings: {
    notifications: boolean;
    autoSave: boolean;
    darkMode: boolean;
  };

  // Invoice Settings
  invoiceSettings: {
    prefix: string;
    paymentTerms: string;
  };

  // Actions
  updatePersonalInfo: (info: Partial<SettingsState['personalInfo']>) => void;
  updateBusinessInfo: (info: Partial<SettingsState['businessInfo']>) => void;
  updateAppSettings: (settings: Partial<SettingsState['appSettings']>) => void;
  updateInvoiceSettings: (settings: Partial<SettingsState['invoiceSettings']>) => void;
  reset: () => void;
}

const initialState = {
  personalInfo: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  },
  businessInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  appSettings: {
    notifications: true,
    autoSave: true,
    darkMode: false,
  },
  invoiceSettings: {
    prefix: "INV",
    paymentTerms: "Net 30",
  },
};

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        updatePersonalInfo: (info) =>
          set(
            (state) => ({
              personalInfo: { ...state.personalInfo, ...info },
            }),
            false,
            "updatePersonalInfo"
          ),

        updateBusinessInfo: (info) =>
          set(
            (state) => ({
              businessInfo: { ...state.businessInfo, ...info },
            }),
            false,
            "updateBusinessInfo"
          ),

        updateAppSettings: (settings) =>
          set(
            (state) => ({
              appSettings: { ...state.appSettings, ...settings },
            }),
            false,
            "updateAppSettings"
          ),

        updateInvoiceSettings: (settings) =>
          set(
            (state) => ({
              invoiceSettings: { ...state.invoiceSettings, ...settings },
            }),
            false,
            "updateInvoiceSettings"
          ),

        reset: () => set(initialState, false, "reset"),
      }),
      {
        name: "settings-store",
        storage: createJSONStorage(() => AsyncStorage),
      }
    ),
    {
      name: "settings-store",
    }
  )
); 