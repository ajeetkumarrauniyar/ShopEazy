import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface LineItem {
  id: string;
  productName: string;
  quantity: string;
  rate: string;
  amount: number;
}

interface Product {
  id: string;
  name: string;
  defaultRate: number;
}

// Mock product data - replace with actual data from your backend/database
const mockProducts: Product[] = [
  { id: "1", name: "Rice (1kg)", defaultRate: 45 },
  { id: "2", name: "Wheat Flour (1kg)", defaultRate: 32 },
  { id: "3", name: "Sugar (1kg)", defaultRate: 38 },
  { id: "4", name: "Tea (250g)", defaultRate: 85 },
  { id: "5", name: "Oil (1L)", defaultRate: 120 },
  { id: "6", name: "Dal (1kg)", defaultRate: 110 },
  { id: "7", name: "Salt (1kg)", defaultRate: 18 },
  { id: "8", name: "Onion (1kg)", defaultRate: 35 },
];

export default function OptimizedInvoice() {
  // Sale Type (B2C/B2B)
  const [saleType, setSaleType] = useState<"B2C" | "B2B">("B2C");

  // Customer Information
  const [partyName, setPartyName] = useState("CASH");
  const [partyGstin, setPartyGstin] = useState("");

  // Invoice Details
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Line Items
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", productName: "", quantity: "", rate: "", amount: 0 },
  ]);

  // Product Search Modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [productSearchQuery, setProductSearchQuery] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Auto-generate invoice number on component mount
  useEffect(() => {
    generateInvoiceNumber();
  }, []);

  //TODO: Get the last invoice number saved in the database and increment it
  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    setInvoiceNumber(`INV-${year}-${randomNum.toString().padStart(4, "0")}`);
  };

  const handleSaleTypeToggle = (type: "B2C" | "B2B") => {
    setSaleType(type);
    if (type === "B2C") {
      setPartyName("CASH");
      setPartyGstin("");
    } else {
      setPartyName("");
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setInvoiceDate(selectedDate);
    }
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      productName: "",
      quantity: "",
      rate: "",
      amount: 0,
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Calculate amount when quantity or rate changes
          if (field === "quantity" || field === "rate") {
            const quantity =
              parseFloat(field === "quantity" ? value : item.quantity) || 0;
            const rate = parseFloat(field === "rate" ? value : item.rate) || 0;
            updatedItem.amount = quantity * rate;
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const openProductSelector = (index: number) => {
    setSelectedItemIndex(index);
    setProductSearchQuery("");
    setShowProductModal(true);
  };

  const selectProduct = (product: Product) => {
    const itemId = lineItems[selectedItemIndex].id;

    // Update both productName and rate in a single state update
    setLineItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const updatedItem = {
            ...item,
            productName: product.name,
            rate: product.defaultRate.toString(),
          };

          // Recalculate amount if quantity exists
          if (item.quantity) {
            const quantity = parseFloat(item.quantity) || 0;
            const rate = product.defaultRate;
            updatedItem.amount = quantity * rate;
          }

          return updatedItem;
        }
        return item;
      })
    );

    setShowProductModal(false);
  };

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(productSearchQuery.toLowerCase())
  );

  // Calculations
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const taxRate = saleType === "B2B" ? 18 : 0; // 18% GST for B2B, 0% for B2C
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const handleSaveInvoice = async () => {
    // Basic validation
    if (!partyName) {
      Alert.alert("Error", "Please enter party name");
      return;
    }

    if (saleType === "B2B" && !partyGstin) {
      Alert.alert("Error", "GSTIN is required for B2B sales");
      return;
    }

    if (
      !lineItems.some((item) => item.productName && item.quantity && item.rate)
    ) {
      Alert.alert(
        "Error",
        "Please add at least one product with quantity and rate"
      );
      return;
    }

    setLoading(true);

    try {
      const preparedItems = lineItems
        .filter((item) => item.productName && item.quantity && item.rate)
        .map((item) => ({
          productName: item.productName.trim(),
          quantity: parseFloat(item.quantity) || 0,
          rate: parseFloat(item.rate) || 0,
          amount: item.amount,
        }));

      const payload = {
        saleType,
        partyName: partyName.trim(),
        partyGstin: partyGstin.trim(),
        invoiceNumber,
        invoiceDate: invoiceDate.toISOString(),
        lineItems: preparedItems,
        subtotal,
        taxAmount,
        total,
      };

      console.log("Saving invoice with data:", payload);

      // TODO: Replace with actual API call
      // const response = await api.post("/api/invoice", payload);

      // Reset form
      setLineItems([
        { id: "1", productName: "", quantity: "", rate: "", amount: 0 },
      ]);
      setSaleType("B2C");
      setPartyName("CASH");
      setPartyGstin("");
      setInvoiceDate(new Date());
      generateInvoiceNumber();

      Alert.alert("Success", "Invoice saved successfully!");
    } catch (error: any) {
      console.error("Error saving invoice:", error);
      Alert.alert("Error", "Failed to save invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportInvoice = () => {
    Alert.alert("Export", "Invoice export feature coming soon!");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Sale Type Toggle */}
        <View style={styles.section}>
          <View style={styles.invoiceDate}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Sale Type
            </ThemedText>
            
            <View style={styles.inputContainer}>
              {/* <ThemedText style={styles.inputLabel}>Invoice Date</ThemedText> */}
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <ThemedText style={styles.dateText}>
                  {invoiceDate.toLocaleDateString()}
                </ThemedText>
                <Ionicons name="calendar" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sale Type Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                saleType === "B2C"
                  ? styles.toggleButtonActive
                  : styles.toggleButtonInactive,
              ]}
              onPress={() => handleSaleTypeToggle("B2C")}
            >
              <ThemedText
                style={[
                  styles.toggleText,
                  saleType === "B2C"
                    ? styles.toggleTextActive
                    : styles.toggleTextInactive,
                ]}
              >
                B2C
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                saleType === "B2B"
                  ? styles.toggleButtonActive
                  : styles.toggleButtonInactive,
              ]}
              onPress={() => handleSaleTypeToggle("B2B")}
            >
              <ThemedText
                style={[
                  styles.toggleText,
                  saleType === "B2B"
                    ? styles.toggleTextActive
                    : styles.toggleTextInactive,
                ]}
              >
                B2B
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <View style={styles.invoiceDetails}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Customer Information
            </ThemedText>
            <Text style={styles.invoiceNo}>#INV-20232</Text>
          </View>
          <TextInput
            label="Party Name *"
            value={partyName}
            onChangeText={setPartyName}
            placeholder={saleType === "B2C" ? "CASH" : "Enter customer name"}
            variant="outline"
            containerStyle={styles.inputContainer}
          />

          {saleType === "B2B" && (
            <TextInput
              label="GSTIN *"
              value={partyGstin}
              onChangeText={setPartyGstin}
              placeholder="Enter GSTIN"
              variant="outline"
              containerStyle={styles.inputContainer}
            />
          )}
        </View>

        {/* Invoice Details */}
        <View style={styles.section}>
          {/* <ThemedText type="subtitle" style={styles.sectionTitle}>
            Invoice Details
          </ThemedText> */}

          <View style={styles.row}>
            {/* <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Invoice Number</ThemedText>
              <View style={styles.invoiceNumberContainer}>
                <ThemedText style={styles.invoiceNumberText}>
                  {invoiceNumber}
                </ThemedText>
                <TouchableOpacity onPress={generateInvoiceNumber}>
                  <Ionicons name="refresh" size={20} color="#007AFF" />
                </TouchableOpacity>
              </View>
            </View> */}

            {/* <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Invoice Date</ThemedText>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <ThemedText style={styles.dateText}>
                  {invoiceDate.toLocaleDateString()}
                </ThemedText>
                <Ionicons name="calendar" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View> */}
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={invoiceDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Line Items */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Products
          </ThemedText>

          <ScrollView
            style={styles.lineItemsContainer}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {lineItems.map((item, index) => (
              <View key={item.id} style={styles.lineItem}>
                <View style={styles.lineItemHeader}>
                  <ThemedText style={styles.lineItemNumber}>
                    Item {index + 1}
                  </ThemedText>
                  {lineItems.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onPress={() => removeLineItem(item.id)}
                      style={styles.removeButton}
                    >
                      <Ionicons name="trash" size={14} color="#FF3B30" />
                    </Button>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.productSelector}
                  onPress={() => openProductSelector(index)}
                >
                  <ThemedText style={styles.productSelectorLabel}>
                    Product *
                  </ThemedText>
                  <View style={styles.productSelectorButton}>
                    <ThemedText
                      style={[
                        styles.productSelectorText,
                        !item.productName && styles.placeholderText,
                      ]}
                    >
                      {item.productName || "Select Product"}
                    </ThemedText>
                    <Ionicons name="chevron-down" size={16} color="#666" />
                  </View>
                </TouchableOpacity>

                <View style={styles.row}>
                  <TextInput
                    label="Quantity *"
                    value={item.quantity}
                    onChangeText={(value) =>
                      updateLineItem(item.id, "quantity", value)
                    }
                    placeholder="1"
                    variant="outline"
                    keyboardType="numeric"
                    containerStyle={styles.inputContainer}
                  />

                  <TextInput
                    label="Rate *"
                    value={item.rate}
                    onChangeText={(value) =>
                      updateLineItem(item.id, "rate", value)
                    }
                    placeholder="0.00"
                    variant="outline"
                    keyboardType="numeric"
                    containerStyle={styles.inputContainer}
                  />

                  <View style={styles.inputContainer}>
                    <ThemedText style={styles.inputLabel}>Amount</ThemedText>
                    <View style={styles.amountContainer}>
                      <ThemedText style={styles.amountText}>
                        ₹{item.amount.toFixed(2)}
                      </ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Add Item Button - Fixed at bottom of products section */}
          <Button
            variant="outline"
            onPress={addLineItem}
            style={styles.addItemButton}
          >
            <Ionicons name="add" size={16} color="#007AFF" />
            Add Another Product
          </Button>
        </View>

        {/* Total Summary */}
        <View style={styles.section}>
          <View style={styles.summaryContainer}>
            {saleType === "B2B" && (
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Subtotal:</ThemedText>
                <ThemedText style={styles.summaryValue}>
                  ₹{subtotal.toFixed(2)}
                </ThemedText>
              </View>
            )}

            {saleType === "B2B" && (
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>
                  GST ({taxRate}%):
                </ThemedText>
                <ThemedText style={styles.summaryValue}>
                  ₹{taxAmount.toFixed(2)}
                </ThemedText>
              </View>
            )}

            <View style={[styles.summaryRow, styles.totalRow]}>
              <ThemedText style={styles.totalLabel}>Total:</ThemedText>
              <ThemedText style={styles.totalValue}>
                ₹{total.toFixed(2)}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            variant="outline"
            onPress={handleExportInvoice}
            style={styles.actionButton}
          >
            <Ionicons name="download" size={16} color="#007AFF" />
            Export
          </Button>

          <Button
            variant="filled"
            onPress={handleSaveInvoice}
            style={styles.actionButton}
            disabled={loading}
          >
            <Ionicons name="save" size={16} color="#fff" />
            {loading ? "Saving..." : "Save Invoice"}
          </Button>
        </View>
      </ScrollView>

      {/* Product Selection Modal */}
      <Modal
        visible={showProductModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <ThemedText type="subtitle">Select Product</ThemedText>
            <TouchableOpacity onPress={() => setShowProductModal(false)}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <TextInput
            label=""
            value={productSearchQuery}
            onChangeText={setProductSearchQuery}
            placeholder="Search products..."
            variant="outline"
            containerStyle={styles.searchInput}
          />

          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productItem}
                onPress={() => selectProduct(item)}
              >
                <View style={styles.productItemContent}>
                  <ThemedText style={styles.productName}>
                    {item.name}
                  </ThemedText>
                  <ThemedText style={styles.productRate}>
                    ₹{item.defaultRate}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            )}
            style={styles.productList}
          />
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: "600",
  },
  invoiceDate: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  invoiceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  invoiceNo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#007AFF",
  },
  toggleButtonInactive: {
    backgroundColor: "transparent",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
  },
  toggleTextActive: {
    color: "#fff",
  },
  toggleTextInactive: {
    color: "#666",
  },
  invoiceNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  invoiceNumberText: {
    fontSize: 16,
    fontWeight: "600",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  dateText: {
    fontSize: 16,
  },
  addItemButton: {
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  lineItem: {
    backgroundColor: "rgba(0, 122, 255, 0.05)",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  lineItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  lineItemNumber: {
    fontWeight: "600",
    fontSize: 16,
  },
  removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  productSelector: {
    marginBottom: 16,
  },
  productSelectorLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  productSelectorButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  productSelectorText: {
    fontSize: 16,
  },
  placeholderText: {
    color: "#999",
  },
  amountContainer: {
    height: 44,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#008000",
  },
  summaryContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    borderRadius: 8,
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007AFF",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  searchInput: {
    marginBottom: 16,
  },
  productList: {
    flex: 1,
  },
  productItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
  },
  productItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    flex: 1,
  },
  productRate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  lineItemsContainer: {
    flex: 1,
  },
});
