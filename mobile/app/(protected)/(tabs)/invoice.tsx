import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
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

  // Add ref for the ScrollView
  const lineItemsScrollRef = useRef<ScrollView>(null);

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
    
    // Auto scroll to bottom after adding new item
    setTimeout(() => {
      lineItemsScrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
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
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.invoiceHeader}>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color="#007AFF" />
              <ThemedText style={styles.dateText}>
                {invoiceDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </ThemedText>
            </TouchableOpacity>
            
            <View style={styles.invoiceNumberBadge}>
              <ThemedText style={styles.invoiceNumberText}>
                {invoiceNumber}
              </ThemedText>
            </View>
          </View>

          <View style={styles.dateSection}></View>
        </View>

        {/* Sale Type Section */}
        <View style={styles.section}>
          <View style={styles.saleTypeRow}>
            <ThemedText type="subtitle" style={styles.sectionTitleInline}>
              Sale Type
            </ThemedText>
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
                <Ionicons
                  name="person-outline"
                  size={16}
                  color={saleType === "B2C" ? "#fff" : "#666"}
                />
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
                <Ionicons
                  name="business-outline"
                  size={16}
                  color={saleType === "B2B" ? "#fff" : "#666"}
                />
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
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Customer Information
          </ThemedText>
          <View style={styles.customerCard}>
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
                placeholder="Enter GSTIN (e.g., 22AAAAA0000A1Z5)"
                variant="outline"
                containerStyle={styles.inputContainer}
              />
            )}
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={invoiceDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        {/* Products Section */}
        <View style={styles.section}>
          <View style={styles.productsSectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Products
            </ThemedText>
            <View style={styles.itemsCountBadge}>
              <ThemedText style={styles.itemsCountText}>
                {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}
              </ThemedText>
            </View>
          </View>

          <View style={styles.productsContainer}>
            <ScrollView
              ref={lineItemsScrollRef}
              style={styles.lineItemsContainer}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >
              {lineItems.map((item, index) => (
                <View key={item.id} style={styles.lineItem}>
                  <View style={styles.lineItemHeader}>
                    <View style={styles.itemNumberContainer}>
                      <ThemedText style={styles.lineItemNumber}>
                        #{index + 1}
                      </ThemedText>
                    </View>
                    {lineItems.length > 1 && (
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeLineItem(item.id)}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={16}
                          color="#FF3B30"
                        />
                      </TouchableOpacity>
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
                      <View style={styles.productSelectorContent}>
                        <Ionicons
                          name="cube-outline"
                          size={16}
                          color={item.productName ? "#007AFF" : "#999"}
                        />
                        <ThemedText
                          style={[
                            styles.productSelectorText,
                            !item.productName && styles.placeholderText,
                          ]}
                        >
                          {item.productName || "Select Product"}
                        </ThemedText>
                      </View>
                      <Ionicons name="chevron-down" size={16} color="#666" />
                    </View>
                  </TouchableOpacity>

                  <View style={styles.row}>
                    <View style={styles.qtyInputGroup}>
                      <TextInput
                        label="Qty *"
                        value={item.quantity}
                        onChangeText={(value) =>
                          updateLineItem(item.id, "quantity", value)
                        }
                        placeholder="1"
                        variant="outline"
                        keyboardType="numeric"
                        maxLength={4}
                        containerStyle={styles.smallInputContainer}
                      />
                    </View>

                    <View style={styles.rateInputGroup}>
                      <TextInput
                        label="Rate *"
                        value={item.rate}
                        onChangeText={(value) =>
                          updateLineItem(item.id, "rate", value)
                        }
                        placeholder="0.00"
                        variant="outline"
                        keyboardType="numeric"
                        maxLength={4}
                        containerStyle={styles.smallInputContainer}
                      />
                    </View>

                    <View style={styles.amountInputGroup}>
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

            <View style={styles.stickyButtonContainer}>
              <Button
                variant="outline"
                onPress={addLineItem}
                style={styles.addItemButton}
              >
                <Ionicons name="add-circle-outline" size={18} color="#007AFF" />
                Add Another Product
              </Button>
            </View>
          </View>
        </View>

        {/* Total Summary */}
        <View style={styles.section}>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryHeader}>
              <Ionicons name="calculator-outline" size={20} color="#007AFF" />
              <ThemedText type="subtitle" style={styles.summaryTitle}>
                Invoice Summary
              </ThemedText>
            </View>

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
              <ThemedText style={styles.totalLabel}>Total Amount:</ThemedText>
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
            <Ionicons name="download-outline" size={18} color="#007AFF" />
            Export
          </Button>

          <Button
            variant="filled"
            onPress={handleSaveInvoice}
            style={[styles.actionButton, styles.primaryButton]}
            disabled={loading}
          >
            <Ionicons name="save-outline" size={18} color="#fff" />
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
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerSection: {
    marginBottom: 24,
  },
  invoiceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  invoiceNumberBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  invoiceNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1976d2",
  },
  dateSection: {
    alignItems: "flex-start",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  customerCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 3,
    width: "70%",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 7,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  toggleButtonActive: {
    backgroundColor: "#007AFF",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleButtonInactive: {
    backgroundColor: "transparent",
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "600",
  },
  toggleTextActive: {
    color: "#fff",
  },
  toggleTextInactive: {
    color: "#666",
  },
  productsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  itemsCountBadge: {
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemsCountText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2e7d32",
  },
  productsContainer: {
    height: 420,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  lineItemsContainer: {
    flex: 1,
    padding: 20,
  },
  stickyButtonContainer: {
    backgroundColor: "#fafafa",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    padding: 16,
  },
  addItemButton: {
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderColor: "#007AFF",
    borderWidth: 2,
    borderRadius: 12,
  },
  lineItem: {
    backgroundColor: "#f8f9ff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e3f2fd",
  },
  lineItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  itemNumberContainer: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lineItemNumber: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  removeButton: {
    backgroundColor: "#ffebee",
    padding: 8,
    borderRadius: 8,
  },
  productSelector: {
    marginBottom: 16,
  },
  productSelectorLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  productSelectorButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  productSelectorContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  productSelectorText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  placeholderText: {
    color: "#999",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
  },
  qtyInputGroup: {
    width: 80, // Width for 4 digits + padding
  },
  rateInputGroup: {
    width: 100, // Width for 4 digits + decimal + padding
  },
  amountInputGroup: {
    flex: 1, // Takes remaining space for up to 10 characters
    minWidth: 120, // Minimum width for 10 characters
  },
  inputGroup: {
    flex: 1, // Keep this for other input groups that need equal spacing
  },
  inputContainer: {
    marginBottom: 0,
  },
  smallInputContainer: {
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  amountContainer: {
    height: 48,
    backgroundColor: "#e8f5e8",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#c8e6c8",
  },
  amountText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2e7d32",
    textAlign: "center",
  },
  summaryContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: "#e0e0e0",
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#007AFF",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
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
  saleTypeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitleInline: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 0,
  },
});
