import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export default function Dashboard() {
  const handleCreateInvoice = () => {
    router.push('/(protected)/(tabs)/invoice');
  };

  const handleViewInvoices = () => {
    Alert.alert("Coming Soon", "View saved invoices feature will be available soon!");
  };

  const handleViewReports = () => {
    Alert.alert("Coming Soon", "Reports feature will be available soon!");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="document-text" size={32} color="#007AFF" />
            <ThemedText style={styles.statNumber}>12</ThemedText>
            <ThemedText style={styles.statLabel}>Total Invoices</ThemedText>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="cash" size={32} color="#34C759" />
            <ThemedText style={styles.statNumber}>$2,450</ThemedText>
            <ThemedText style={styles.statLabel}>Total Revenue</ThemedText>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="time" size={32} color="#FF9500" />
            <ThemedText style={styles.statNumber}>3</ThemedText>
            <ThemedText style={styles.statLabel}>Pending</ThemedText>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={32} color="#34C759" />
            <ThemedText style={styles.statNumber}>9</ThemedText>
            <ThemedText style={styles.statLabel}>Paid</ThemedText>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>
          
          <Button
            variant="filled"
            onPress={handleCreateInvoice}
            style={styles.actionButton}
          >
            <Ionicons name="add-circle" size={20} color="white" style={styles.buttonIcon} />
            Create New Invoice
          </Button>
          
          <Button
            variant="outline"
            onPress={handleViewInvoices}
            style={styles.actionButton}
          >
            <Ionicons name="document" size={20} color="#007AFF" style={styles.buttonIcon} />
            View All Invoices
          </Button>
          
          <Button
            variant="outline"
            onPress={handleViewReports}
            style={styles.actionButton}
          >
            <Ionicons name="bar-chart" size={20} color="#007AFF" style={styles.buttonIcon} />
            View Reports
          </Button>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activity</ThemedText>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="add-circle" size={16} color="#34C759" />
            </View>
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityText}>Invoice #INV-001 created</ThemedText>
              <ThemedText style={styles.activityTime}>2 hours ago</ThemedText>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="checkmark-circle" size={16} color="#34C759" />
            </View>
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityText}>Payment received for INV-002</ThemedText>
              <ThemedText style={styles.activityTime}>1 day ago</ThemedText>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="mail" size={16} color="#007AFF" />
            </View>
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityText}>Invoice #INV-003 sent to client</ThemedText>
              <ThemedText style={styles.activityTime}>3 days ago</ThemedText>
            </View>
          </View>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  actionButton: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  activityIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.6,
  },
});
