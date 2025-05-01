import { Invoice } from "@/types";
import { FlatList, Text, View } from "react-native";

interface Props {
  invoices: Invoice[];
}

export default function InvoiceList({ invoices }: Props) {
  return (
    <FlatList
      data={invoices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="p-4 border-b border-gray-200">
          <Text className="font-semibold">
            #{item.invoiceNumber} - {item.customer.name}
          </Text>
          <Text>Status: {item.status}</Text>
          <Text>Total: ₹{item.invoiceTotalAmount.toFixed(2)}</Text>
          <Text>Date: {new Date(item.invoiceDate).toLocaleDateString()}</Text>
        </View>
      )}
    />
  );
}
