import { View, Text, StyleSheet } from "react-native";
import SignOutButton from "../components/signOutButton";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Tab [Profile]</Text>
      <SignOutButton />
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
