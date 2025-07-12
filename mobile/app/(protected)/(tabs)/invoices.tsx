import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import type { InvoiceWithItems } from "@/db/db";
import { ensureDatabaseInitialized } from "@/db/migrate";
import { deleteInvoice, getAllInvoicesWithItems } from "@/services/invoiceService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function InvoicesScreen() {
  const [invoices, setInvoices] = useState<InvoiceWithItems[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceWithItems | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "synced" | "pending">("all");

  useEffect(() => {
    initializeAndLoadData();
  }, []);

  useEffect(() => {
    filterInvoices();
  }, [invoices, searchQuery, filterType]);

  const initializeAndLoadData = async () => {
    try {
      await ensureDatabaseInitialized();
      await loadInvoices();
    } catch (error) {
      console.error("Error initializing invoices screen:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadInvoices = async () => {
    try {
      const allInvoices = await getAllInvoicesWithItems();
      setInvoices(allInvoices);
    } catch (error) {
      console.error("Error loading invoices:", error);
    }
  };

  const filterInvoices = useCallback(() => {
    let filtered = [...invoices];

    // Apply filter type
    if (filterType === "synced") {
      filtered = filtered.filter(invoice => invoice.isSynced);
    } else if (filterType === "pending") {
      filtered = filtered.filter(invoice => !invoice.isSynced);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        invoice =>
          invoice.invoiceNumber.toLowerCase().includes(query) ||
          invoice.customerName.toLowerCase().includes(query) ||
          invoice.saleType.toLowerCase().includes(query)
      );
    }

    setFilteredInvoices(filtered);
  }, [invoices, searchQuery, filterType]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInvoices();
    setRefreshing(false);
  };

  const handleCreateInvoice = () => {
    router.push('/(protected)/(tabs)/invoice');
  };

  const handleViewInvoice = (invoice: InvoiceWithItems) => {
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  const handleDeleteInvoice = (invoice: InvoiceWithItems) => {
    Alert.alert(
      "Delete Invoice",
      `Are you sure you want to delete ${invoice.invoiceNumber}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteInvoice(invoice.id!);
              await loadInvoices();
              Alert.alert("Success", "Invoice deleted successfully");
            } catch (error) {
              console.error("Error deleting invoice:", error);
              Alert.alert("Error", "Failed to delete invoice");
            }
          },
        },
      ]
    );
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.trim() === "") {
      return "Unknown";
    }

    // Handle CURRENT_TIMESTAMP literal string
    if (dateString.trim().toUpperCase() === "CURRENT_TIMESTAMP") {
      return "N/A";
    }

    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.warn("Invalid date format:", dateString);
      return "Invalid date";
    }
  };

  const renderInvoiceItem = ({ item }: { item: InvoiceWithItems }) => (
    <TouchableOpacity
      style={styles.invoiceCard}
      onPress={() => handleViewInvoice(item)}
    >
      <View style={styles.invoiceHeader}>
        <View style={styles.invoiceInfo}>
          <ThemedText style={styles.invoiceNumber}>{item.invoiceNumber}</ThemedText>
          <View style={styles.badgeContainer}>
            <View style={[styles.typeBadge, item.saleType === "B2B" ? styles.b2bBadge : styles.b2cBadge]}>
              <ThemedText style={[styles.typeBadgeText, item.saleType === "B2B" ? styles.b2bText : styles.b2cText]}>
                {item.saleType}
              </ThemedText>
            </View>
            <View style={[styles.syncBadge, item.isSynced ? styles.syncedBadge : styles.pendingBadge]}>
              <Ionicons 
                name={item.isSynced ? "checkmark-circle" : "time"} 
                size={12} 
                color={item.isSynced ? "#34C759" : "#FF9500"} 
              />
              <ThemedText style={[styles.syncText, item.isSynced ? styles.syncedText : styles.pendingText]}>
                {item.isSynced ? "Synced" : "Pending"}
              </ThemedText>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteInvoice(item)}
        >
          <Ionicons name="trash-outline" size={16} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <View style={styles.invoiceDetails}>
        <ThemedText style={styles.customerName}>{item.customerName}</ThemedText>
        <ThemedText style={styles.invoiceDate}>{formatDate(item.invoiceDate)}</ThemedText>
      </View>

      <View style={styles.invoiceFooter}>
        <View style={styles.amountContainer}>
          <ThemedText style={styles.amountLabel}>Total Amount</ThemedText>
          <ThemedText style={styles.amountValue}>{formatCurrency(item.totalAmount)}</ThemedText>
        </View>
        <View style={styles.itemsCount}>
          <ThemedText style={styles.itemsCountText}>
            {item.items?.length || 0} item{(item.items?.length || 0) !== 1 ? 's' : ''}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ThemedText>Loading invoices...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Invoices</ThemedText>
        <TouchableOpacity onPress={handleCreateInvoice} style={styles.createButton}>
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersContainer}>
        <TextInput
          label=""
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search invoices..."
          variant="outline"
          containerStyle={styles.searchInput}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
          <TouchableOpacity
            style={[styles.filterTab, filterType === "all" && styles.activeFilterTab]}
            onPress={() => setFilterType("all")}
          >
            <ThemedText style={[styles.filterTabText, filterType === "all" && styles.activeFilterTabText]}>
              All ({invoices.length})
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filterType === "pending" && styles.activeFilterTab]}
            onPress={() => setFilterType("pending")}
          >
            <ThemedText style={[styles.filterTabText, filterType === "pending" && styles.activeFilterTabText]}>
              Pending ({invoices.filter(i => !i.isSynced).length})
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filterType === "synced" && styles.activeFilterTab]}
            onPress={() => setFilterType("synced")}
          >
            <ThemedText style={[styles.filterTabText, filterType === "synced" && styles.activeFilterTabText]}>
              Synced ({invoices.filter(i => i.isSynced).length})
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Invoice List */}
      {filteredInvoices.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="document-outline" size={64} color="#666" />
          <ThemedText style={styles.emptyStateText}>
            {searchQuery ? "No invoices found" : "No invoices yet"}
          </ThemedText>
          <ThemedText style={styles.emptyStateSubtext}>
            {searchQuery 
              ? "Try adjusting your search or filters"
              : "Create your first invoice to get started"
            }
          </ThemedText>
          {!searchQuery && (
            <Button variant="filled" onPress={handleCreateInvoice} style={styles.createInvoiceButton}>
              <Ionicons name="add-circle" size={20} color="white" />
              Create Invoice
            </Button>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredInvoices}
          renderItem={renderInvoiceItem}
          keyExtractor={(item) => item.id!.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Invoice Detail Modal */}
      <Modal
        visible={showInvoiceModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <ThemedText type="subtitle">Invoice Details</ThemedText>
            <TouchableOpacity onPress={() => setShowInvoiceModal(false)}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {selectedInvoice && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.invoiceDetailCard}>
                <View style={styles.invoiceDetailHeader}>
                  <ThemedText style={styles.invoiceDetailNumber}>
                    {selectedInvoice.invoiceNumber}
                  </ThemedText>
                  <View style={styles.invoiceDetailBadges}>
                    <View style={[styles.typeBadge, selectedInvoice.saleType === "B2B" ? styles.b2bBadge : styles.b2cBadge]}>
                      <ThemedText style={[styles.typeBadgeText, selectedInvoice.saleType === "B2B" ? styles.b2bText : styles.b2cText]}>
                        {selectedInvoice.saleType}
                      </ThemedText>
                    </View>
                    <View style={[styles.syncBadge, selectedInvoice.isSynced ? styles.syncedBadge : styles.pendingBadge]}>
                      <Ionicons 
                        name={selectedInvoice.isSynced ? "checkmark-circle" : "time"} 
                        size={12} 
                        color={selectedInvoice.isSynced ? "#34C759" : "#FF9500"} 
                      />
                      <ThemedText style={[styles.syncText, selectedInvoice.isSynced ? styles.syncedText : styles.pendingText]}>
                        {selectedInvoice.isSynced ? "Synced" : "Pending"}
                      </ThemedText>
                    </View>
                  </View>
                </View>

                <View style={styles.customerInfo}>
                  <ThemedText style={styles.customerDetailName}>{selectedInvoice.customerName}</ThemedText>
                  {selectedInvoice.customerGstin && (
                    <ThemedText style={styles.gstinText}>GSTIN: {selectedInvoice.customerGstin}</ThemedText>
                  )}
                  <ThemedText style={styles.dateText}>{formatDate(selectedInvoice.invoiceDate)}</ThemedText>
                </View>

                <View style={styles.itemsSection}>
                  <ThemedText style={styles.sectionTitle}>Items</ThemedText>
                  {selectedInvoice.items?.map((item, index) => (
                    <View key={item.id} style={styles.itemRow}>
                      <View style={styles.itemInfo}>
                        <ThemedText style={styles.itemName}>{item.productName}</ThemedText>
                        <ThemedText style={styles.itemDetails}>
                          {item.quantity} × ₹{item.rate} = ₹{item.amount.toFixed(2)}
                        </ThemedText>
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.totalsSection}>
                  {selectedInvoice.saleType === "B2B" && (
                    <>
                      <View style={styles.totalRow}>
                        <ThemedText style={styles.totalLabel}>Subtotal:</ThemedText>
                        <ThemedText style={styles.totalValue}>{formatCurrency(selectedInvoice.subtotal)}</ThemedText>
                      </View>
                      <View style={styles.totalRow}>
                        <ThemedText style={styles.totalLabel}>
                          GST ({selectedInvoice.taxRate}%):
                        </ThemedText>
                        <ThemedText style={styles.totalValue}>{formatCurrency(selectedInvoice.taxAmount)}</ThemedText>
                      </View>
                    </>
                  )}
                  <View style={[styles.totalRow, styles.finalTotal]}>
                    <ThemedText style={styles.finalTotalLabel}>Total Amount:</ThemedText>
                    <ThemedText style={styles.finalTotalValue}>{formatCurrency(selectedInvoice.totalAmount)}</ThemedText>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchInput: {
    marginBottom: 12,
  },
  filterTabs: {
    flexDirection: 'row',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  activeFilterTab: {
    backgroundColor: '#007AFF',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  activeFilterTabText: {
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  invoiceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  b2bBadge: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  b2cBadge: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  b2bText: {
    color: '#007AFF',
  },
  b2cText: {
    color: '#34C759',
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  syncedBadge: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
  },
  pendingBadge: {
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
  },
  syncText: {
    fontSize: 12,
    fontWeight: '500',
  },
  syncedText: {
    color: '#34C759',
  },
  pendingText: {
    color: '#FF9500',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  invoiceDetails: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  invoiceDate: {
    fontSize: 14,
    opacity: 0.7,
  },
  invoiceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountContainer: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34C759',
  },
  itemsCount: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemsCountText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 24,
  },
  createInvoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  invoiceDetailCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  invoiceDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  invoiceDetailNumber: {
    fontSize: 20,
    fontWeight: '700',
  },
  invoiceDetailBadges: {
    gap: 8,
  },
  customerInfo: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  customerDetailName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  gstinText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    opacity: 0.7,
  },
  itemsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  itemDetails: {
    fontSize: 12,
    opacity: 0.7,
  },
  totalsSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  finalTotal: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  finalTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
});