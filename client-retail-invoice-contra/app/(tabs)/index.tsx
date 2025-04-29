import { SignedIn, useUser } from "@clerk/clerk-expo";
import { View, Text, StyleSheet } from "react-native";

const DashboardScreen = () => {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Text>Tab [Dashboard]</Text>
      </SignedIn>
    </View>
  );
};
export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
