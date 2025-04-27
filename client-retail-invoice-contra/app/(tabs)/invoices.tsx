import { View, Text, StyleSheet } from "react-native";

export default function InvoicesScree() {
  return (
    <View style={styles.container}>
      <Text>Tab [Invoices]</Text>
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
