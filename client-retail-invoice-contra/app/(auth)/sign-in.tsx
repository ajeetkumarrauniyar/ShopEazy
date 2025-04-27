import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";

export default function SignInScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <Button
        title="Go to Signup"
        onPress={() => router.push("/(auth)/sign-up")}
      />
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
