import { useCallback } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import type { InvoiceWithItems } from "@/db/db";
import { useInvoices } from "@/hooks/useInvoices";
import { useInvoiceStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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
  const {
    filteredInvoices,
    isLoading: loading,
    refreshInvoices,
    deleteInvoice,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    isOnline,
    isSyncing,
    hasPendingOperations,
    pendingOperationsCount,
    syncPendingOperations,
  } = useInvoices();

  const { 
    currentInvoice, 
    setCurrentInvoice 
  } = useInvoiceStore();

  const handleCreateInvoice = () => {
    router.push('/(protected)/(tabs)/invoice');
  };

  const handleViewInvoice = (invoice: InvoiceWithItems) => {
    setCurrentInvoice(invoice);
  };

  const handleDeleteInvoice = useCallback((invoice: InvoiceWithItems) => {
    const deleteAction = async () => {
      try {
        await deleteInvoice(invoice.id!);
        
        if (isOnline) {
          Alert.alert("Success", "Invoice deleted successfully");
        } else {
          Alert.alert(
            "Queued for Deletion", 
            "Invoice will be deleted when you're back online"
          );
        }
      } catch (error) {
        console.error("Error deleting invoice:", error);
        Alert.alert("Error", "Failed to delete invoice");
      }
    };

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
          onPress: deleteAction,
        },
      ]
    );
  }, [deleteInvoice, isOnline]);

  const handleSyncPendingOperations = useCallback(async () => {
    if (!isOnline) {
      Alert.alert("No Internet", "Please check your internet connection");
      return;
    }

    try {
      await syncPendingOperations();
      Alert.alert("Success", "All pending operations synced");
    } catch (error) {
      Alert.alert("Sync Failed", "Some operations could not be synced");
    }
  }, [isOnline, syncPendingOperations]);

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
      style={[
        styles.invoiceCard,
        !item.isSynced && styles.unsynced,
        !isOnline && styles.offline
      ]}
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
          style={[
            styles.deleteButton,
            !isOnline && styles.offlineAction
          ]}
          onPress={() => handleDeleteInvoice(item)}
        >
          <Ionicons 
            name="trash-outline" 
            size={16} 
            color={!isOnline ? "#999" : "#FF3B30"} 
          />
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

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Network Status */}
      <View style={[styles.networkStatus, isOnline ? styles.online : styles.offlineStatus]}>
        <Ionicons 
          name={isOnline ? "wifi" : "wifi-outline"} 
          size={16} 
          color={isOnline ? "#34C759" : "#FF9500"} 
        />
        <ThemedText style={[styles.networkText, isOnline ? styles.onlineText : styles.offlineText]}>
          {isOnline ? "Online" : "Offline"}
        </ThemedText>
        
        {hasPendingOperations && (
          <TouchableOpacity 
            style={styles.syncButton}
            onPress={handleSyncPendingOperations}
            disabled={!isOnline || isSyncing}
          >
            <Ionicons 
              name={isSyncing ? "sync" : "cloud-upload"} 
              size={14} 
              color={isOnline ? "#007AFF" : "#999"} 
            />
            <ThemedText style={styles.syncButtonText}>
              {isSyncing ? "Syncing..." : `Sync (${pendingOperationsCount})`}
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {/* Search */}
      <TextInput
        label=""
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search invoices..."
        variant="outline"
        containerStyle={styles.searchInput}
      />

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {(["all", "synced", "pending"] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              filterType === filter && styles.activeFilterButton,
            ]}
            onPress={() => setFilterType(filter)}
          >
            <ThemedText
              style={[
                styles.filterText,
                filterType === filter && styles.activeFilterText,
              ]}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Create Invoice Button */}
      <Button
        variant="filled"
        onPress={handleCreateInvoice}
        style={styles.createButton}
      >
        <Ionicons name="add-circle" size={20} color="white" />
        Create New Invoice
      </Button>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
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
          refreshControl={
            <RefreshControl 
              refreshing={loading} 
              onRefresh={refreshInvoices}
              colors={["#007AFF"]}
              tintColor="#007AFF"
            />
          }
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Invoice Detail Modal */}
      <Modal
        visible={!!currentInvoice}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setCurrentInvoice(null)}
      >
        {currentInvoice && (
          <ThemedView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <ThemedText type="subtitle">Invoice Details</ThemedText>
              <TouchableOpacity onPress={() => setCurrentInvoice(null)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.invoiceDetailCard}>
                <ThemedText style={styles.modalInvoiceNumber}>
                  {currentInvoice.invoiceNumber}
                </ThemedText>
                <ThemedText style={styles.modalCustomerName}>
                  {currentInvoice.customerName}
                </ThemedText>
                <ThemedText style={styles.modalDate}>
                  {formatDate(currentInvoice.invoiceDate)}
                </ThemedText>
                
                <View style={styles.modalAmountContainer}>
                  <ThemedText style={styles.modalAmountLabel}>Total Amount</ThemedText>
                  <ThemedText style={styles.modalAmountValue}>
                    {formatCurrency(currentInvoice.totalAmount)}
                  </ThemedText>
                </View>

                {currentInvoice.items && currentInvoice.items.length > 0 && (
                  <View style={styles.itemsList}>
                    <ThemedText style={styles.itemsTitle}>Items:</ThemedText>
                    {currentInvoice.items.map((item, index) => (
                      <View key={index} style={styles.itemRow}>
                        <ThemedText style={styles.itemName}>{item.productName}</ThemedText>
                        <ThemedText style={styles.itemDetails}>
                          {item.quantity} × ₹{item.rate} = ₹{item.amount}
                        </ThemedText>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
          </ThemedView>
        )}
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  networkStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  online: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
  },
  offlineStatus: {
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
  },
  networkText: {
    fontSize: 14,
    fontWeight: '500',
  },
  onlineText: {
    color: '#34C759',
  },
  offlineText: {
    color: '#FF9500',
  },
  syncButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  syncButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007AFF',
  },
  searchInput: {
    marginBottom: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  activeFilterText: {
    color: 'white',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  listContainer: {
    padding: 16,
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
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 20,
  },
  createInvoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  invoiceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unsynced: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  offline: {
    opacity: 0.7,
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
    fontSize: 10,
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
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  syncedBadge: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
  },
  pendingBadge: {
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
  },
  syncText: {
    fontSize: 10,
    fontWeight: '500',
  },
  syncedText: {
    color: '#34C759',
  },
  pendingText: {
    color: '#FF9500',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  offlineAction: {
    backgroundColor: 'rgba(153, 153, 153, 0.1)',
  },
  invoiceDetails: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
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
    color: '#007AFF',
  },
  itemsCount: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  itemsCountText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007AFF',
  },
  modalContainer: {
    flex: 1,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    flex: 1,
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
  modalInvoiceNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  modalCustomerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  modalDate: {
    fontSize: 14,
    opacity: 0.7,
  },
  modalAmountContainer: {
    marginTop: 16,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalAmountLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 2,
  },
  modalAmountValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  itemsList: {
    marginBottom: 20,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  itemRow: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
    borderRadius: 8,
    marginBottom: 8,
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
});