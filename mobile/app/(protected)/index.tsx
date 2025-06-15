import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      console.log("🔄 Logging out user...");
      await signOut();
      console.log("✅ User logged out successfully");
      // No need to manually navigate - the protected layout will handle the redirect
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <ThemedText type="title">स्वागत है!</ThemedText>
      <ThemedText type="title">Home Screen</ThemedText>

      <Button onPress={handleLogout} style={{ marginTop: 20 }}>
        लॉगआउट करें
      </Button>
    </View>
  );
}
