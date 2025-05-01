// app/(tabs)/invoices.tsx
import { ActivityIndicator, Button, Text, View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import InvoiceList from "../../components/InvoiceList";
import {
  useInvoices,
  useCreateInvoice,
  useEnsureAuth,
} from "../../hooks/useInvoices";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function InvoicesScreen() {
  const queryClient = useQueryClient();
  const { isSignedIn, isLoaded } = useAuth();

  // Make sure we have a fresh auth token
  useEnsureAuth();

  const { data, isLoading, error, refetch } = useInvoices();

  const { mutateAsync: createNewInvoice, isPending: isCreating } =
    useCreateInvoice();

  const handleCreateInvoice = async () => {
    try {
      await createNewInvoice({
        customerId: "123", // Replace with actual customer ID
        items: [
          {
            productId: "Xyz", // Replace with actual product ID
            quantity: 1,
          },
        ],
      });
      // Refetch after creating
      refetch();
    } catch (err) {
      console.error("Failed to create invoice:", err);
    }
  };

  // Show loading while Clerk auth is initializing
  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2">Loading authentication...</Text>
      </View>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!isSignedIn) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg mb-4">
          You need to sign in to view invoices
        </Text>
        <Button
          title="Go to Sign In"
          onPress={() => {
            // Navigate to sign in - adjust based on your routing
            router.push("/sign-in");
          }}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2">Loading invoices...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 mb-4">
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to load invoices"}
        </Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Invoices</Text>
        <Button
          title={isCreating ? "Creating..." : "New Invoice"}
          onPress={handleCreateInvoice}
          disabled={isCreating}
        />
      </View>

      {data && Array.isArray(data) ? (
        data.length > 0 ? (
          <InvoiceList invoices={data} />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">No invoices found</Text>
          </View>
        )
      ) : null}
    </View>
  );
}
