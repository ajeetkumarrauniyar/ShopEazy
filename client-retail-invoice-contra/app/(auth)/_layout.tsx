import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator, View } from "react-native";

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href={"/(tabs)"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ title: "Login" }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
    </Stack>
  );
}