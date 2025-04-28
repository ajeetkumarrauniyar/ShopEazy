import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ProfileScreen() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/"); // After logout, go back to splash screen which will then redirect to login
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <Text>Tab [Profile]</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
