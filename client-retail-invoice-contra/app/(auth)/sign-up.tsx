import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Signup Page</Text>
      <Button
        title="Go to Login"
        onPress={() => router.push("/(auth)/sign-in")}
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
