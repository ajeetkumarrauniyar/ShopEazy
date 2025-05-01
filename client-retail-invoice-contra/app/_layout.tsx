import { ClerkProvider } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native";
import InvoicesScreen from "@/app/(tabs)/invoices";
import QueryProvider from "@/components/QueryProvider";
import { Stack } from "expo-router";

export default function App() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <QueryProvider>
        {/* <SafeAreaView style={{ flex: 1 }}>
         
        </SafeAreaView> */}
        <Stack screenOptions={{ headerShown: false }}>
          <InvoicesScreen />
        </Stack>
      </QueryProvider>
    </ClerkProvider>
  );
}
