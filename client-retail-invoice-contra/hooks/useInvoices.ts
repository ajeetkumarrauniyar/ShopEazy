import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInvoices, createInvoice } from "@/lib/api";
import { useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { Invoice } from "@/types";

// Hook to ensure we have a valid auth token before making API calls
export const useEnsureAuth = () => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const updateToken = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          if (token) {
            await SecureStore.setItemAsync("clerk_token", token);
            console.log("Auth token updated and stored");
          }
        } catch (error) {
          console.error("Failed to update auth token:", error);
        }
      }
    };

    updateToken();
  }, [isSignedIn, getToken]);

  return { isSignedIn };
};

export const useInvoices = () => {
  const { isSignedIn } = useEnsureAuth();

  return useQuery<Invoice[], Error>({
    queryKey: ["invoices"],
    queryFn: async () => {
      const invoices = await getInvoices();
      return invoices;
    },
    enabled: isSignedIn === true,
    retry: (failureCount, error) => {
      if (error.message === "Unauthenticated") return false;
      return failureCount < 3;
    },
    // Proper error handling for React Query v4+
    meta: {
      errorHandler: (error: Error) => {
        console.error("Invoice fetch error:", error);
      },
    },
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      // Invalidate invoices query
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error) => {
      console.error("Invoice creation error:", error);
    },
  });
};
