import { SignOutButton } from "@/app/components/signOutButton";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import { View, Text, StyleSheet } from "react-native";

export default function DashboardScreen() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Text>Tab [Dashboard]</Text>
        <SignOutButton />
      </SignedIn>
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
