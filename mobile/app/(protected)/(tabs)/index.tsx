import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import type { InvoiceWithItems } from "@/db/db";
import { ensureDatabaseInitialized } from "@/db/migrate";
import { getAllInvoicesWithItems } from "@/services/invoiceService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

interface DashboardStats {
  totalInvoices: number;
  totalRevenue: number;
  pendingInvoices: number;
  syncedInvoices: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInvoices: 0,
    totalRevenue: 0,
    pendingInvoices: 0,
    syncedInvoices: 0,
  });
  const [recentInvoices, setRecentInvoices] = useState<InvoiceWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    initializeAndLoadData();
  }, []);

  const initializeAndLoadData = async () => {
    try {
      await ensureDatabaseInitialized();
      await loadDashboardData();
    } catch (error) {
      console.error("Error initializing dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      const invoices = await getAllInvoicesWithItems();

      // Calculate stats
      const totalInvoices = invoices.length;
      const totalRevenue = invoices.reduce(
        (sum, invoice) => sum + invoice.totalAmount,
        0
      );
      const syncedInvoices = invoices.filter(
        (invoice) => invoice.isSynced
      ).length;
      const pendingInvoices = totalInvoices - syncedInvoices;

      setStats({
        totalInvoices,
        totalRevenue,
        pendingInvoices,
        syncedInvoices,
      });

      // Get recent invoices (last 3)
      setRecentInvoices(invoices.slice(0, 3));
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleCreateInvoice = () => {
    router.push("/(protected)/(tabs)/invoice");
  };

  const handleViewInvoices = () => {
    router.push("/(protected)/(tabs)/invoices");
  };

  const handleViewReports = () => {
    Alert.alert("Coming Soon", "Reports feature will be available soon!");
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

    // Handle SQLite datetime format and ISO strings
    let date: Date;
    
    // If it's an SQLite datetime format (YYYY-MM-DD HH:mm:ss)
    if (dateString.includes(" ") && !dateString.includes("T")) {
      // Convert SQLite datetime to ISO format
      const isoString = dateString.replace(" ", "T") + "Z";
      date = new Date(isoString);
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      console.warn("Invalid date format:", dateString);
      return "Invalid date";
    }

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ThemedText>Loading dashboard...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="document-text" size={32} color="#007AFF" />
            <ThemedText style={styles.statNumber}>
              {stats.totalInvoices}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Total Invoices</ThemedText>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="cash" size={32} color="#34C759" />
            <ThemedText style={styles.statNumber}>
              {formatCurrency(stats.totalRevenue)}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Total Revenue</ThemedText>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="time" size={32} color="#FF9500" />
            <ThemedText style={styles.statNumber}>
              {stats.pendingInvoices}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Pending Sync</ThemedText>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={32} color="#34C759" />
            <ThemedText style={styles.statNumber}>
              {stats.syncedInvoices}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Synced</ThemedText>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Button
            variant="filled"
            onPress={handleCreateInvoice}
            style={styles.actionButton}
          >
            <Ionicons
              name="add-circle"
              size={20}
              color="white"
              style={styles.buttonIcon}
            />
            Create New Invoice
          </Button>

          <Button
            variant="outline"
            onPress={handleViewInvoices}
            style={styles.actionButton}
          >
            <Ionicons
              name="document"
              size={20}
              color="#007AFF"
              style={styles.buttonIcon}
            />
            View All Invoices
          </Button>

          <Button
            variant="outline"
            onPress={handleViewReports}
            style={styles.actionButton}
          >
            <Ionicons
              name="bar-chart"
              size={20}
              color="#007AFF"
              style={styles.buttonIcon}
            />
            View Reports
          </Button>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Recent Invoices
            </ThemedText>
            {recentInvoices.length > 0 && (
              <Button
                variant="outline"
                onPress={handleViewInvoices}
                style={styles.viewAllButton}
              >
                View All
              </Button>
            )}
          </View>

          {recentInvoices.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="document-outline" size={48} color="#666" />
              <ThemedText style={styles.emptyStateText}>
                No invoices yet
              </ThemedText>
              <ThemedText style={styles.emptyStateSubtext}>
                Create your first invoice to get started
              </ThemedText>
            </View>
          ) : (
            recentInvoices.map((invoice) => (
              <View key={invoice.id} style={styles.activityItem}>
                <View
                  style={[
                    styles.activityIcon,
                    {
                      backgroundColor: invoice.isSynced
                        ? "rgba(52, 199, 89, 0.1)"
                        : "rgba(255, 149, 0, 0.1)",
                    },
                  ]}
                >
                  <Ionicons
                    name={invoice.isSynced ? "checkmark-circle" : "time"}
                    size={16}
                    color={invoice.isSynced ? "#34C759" : "#FF9500"}
                  />
                </View>
                <View style={styles.activityContent}>
                  <ThemedText style={styles.activityText}>
                    {invoice.invoiceNumber} - {invoice.customerName}
                  </ThemedText>
                  <View style={styles.activityDetails}>
                    <ThemedText style={styles.activityAmount}>
                      {formatCurrency(invoice.totalAmount)}
                    </ThemedText>
                    <ThemedText style={styles.activityTime}>
                      {formatDate(invoice.createdAt || "")}
                    </ThemedText>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(0, 122, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: "center",
  },
  section: {
    marginTop: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "600",
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButton: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  activityIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  activityDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#34C759",
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  emptyState: {
    alignItems: "center",
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: "center",
  },
});