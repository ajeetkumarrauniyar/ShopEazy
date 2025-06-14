import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/"); // Redirect to login screen
    } catch (error) {
      console.error("Logout failed:", error);
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
