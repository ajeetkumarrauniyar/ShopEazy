import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";

// Define the product type to fix TypeScript issues
interface Product {
  name: string;
  sellRate: string;
  quantity: string;
}

const initialProduct = { name: "", sellRate: "", quantity: "" };

export default function InvoicesScree() {
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [products, setProducts] = useState([{ ...initialProduct }]);

  const openDatePicker = () => {
    if (Platform.OS === "android") {
      setShowDatePicker(true);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setInvoiceDate(selectedDate);
    }
  };

  const addNewProduct = () => {
    setProducts([...products, { ...initialProduct }]);
  };

  const handleProductChange = (index: number, field: string, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };
    setProducts(updatedProducts);
  };

  const handleSaveInvoice = () => {
    console.log("Saving Invoice...");
    console.log({
      invoiceDate,
      products,
    });
    // TODO: Send this data to your backend (Supabase etc.)
    alert("Invoice Saved!");
  };

  const calculateTotal = () => {
    return products
      .reduce((sum, product) => {
        const rate = parseFloat(product.sellRate) || 0;
        const qty = parseFloat(product.quantity) || 0;
        return sum + rate * qty;
      }, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.invoiceDetails}>
        <Text style={styles.heading}>Party: Cash</Text>
        <Text style={styles.invoiceNo}>#INV-20232</Text>
      </View>

      {/* Invoice Date */}
      <TouchableOpacity onPress={openDatePicker} style={styles.datePicker}>
        <Text>{invoiceDate.toDateString()}</Text>
      </TouchableOpacity>

      {/* Date Picker for Android */}
      {showDatePicker && (
        <DateTimePickerAndroid
          value={invoiceDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Product List Header */}
      <View style={styles.productHeader}>
        <Text style={styles.headerText}>Product</Text>
        <Text style={styles.headerText}>Rate</Text>
        <Text style={styles.headerText}>Qty</Text>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.productRow}>
            <TextInput
              placeholder="Product Name"
              value={item.name}
              onChangeText={(text) => handleProductChange(index, "name", text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Sell Rate"
              value={item.sellRate}
              onChangeText={(text) =>
                handleProductChange(index, "sellRate", text)
              }
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Quantity"
              value={item.quantity}
              onChangeText={(text) =>
                handleProductChange(index, "quantity", text)
              }
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        )}
      />

      {/* Add New Product */}
      <Button title="Add Another Product" onPress={addNewProduct} />

      {/* Invoice Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>₹{calculateTotal()}</Text>
      </View>

      {/* Save Invoice */}
      <TouchableOpacity onPress={handleSaveInvoice} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Invoice</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  invoiceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  invoiceNo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  datePicker: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  headerText: {
    fontWeight: "bold",
    color: "#555",
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    flex: 2,
    backgroundColor: "#fff",
    marginRight: 8,
  },
  rateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
    marginRight: 8,
  },
  qtyInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008000",
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
