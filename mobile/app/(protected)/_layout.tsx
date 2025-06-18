import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading screen while auth is being checked
  if (!isLoaded) {
    return null;
  }

  // Redirect to login if not signed in
  if (!isSignedIn) {
    console.log("❌ User not signed in. Redirecting to login...");
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Disable headers completely for tab navigation
      }}
    >
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
          title: "" // Remove any title that might show
        }} 
      />
    </Stack>
  );
}
