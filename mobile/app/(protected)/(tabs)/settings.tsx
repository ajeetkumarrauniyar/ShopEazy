import ResetButtonDevOnly from "@/components/ResetButtonDevOnly";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { useAppStore, useSettingsStore } from "@/stores";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Switch, View } from "react-native";

export default function Settings() {
  const { signOut } = useAuth();
  const { user } = useUser();

  // Use both stores - appStore for global state, settingsStore for user preferences
  const { isDarkMode, setDarkMode } = useAppStore();

  const {
    personalInfo,
    businessInfo,
    appSettings,
    invoiceSettings,
    updatePersonalInfo,
    updateBusinessInfo,
    updateAppSettings,
    updateInvoiceSettings,
  } = useSettingsStore();

  // Initialize with user data from Clerk
  useEffect(() => {
    if (user) {
      updatePersonalInfo({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, [user, updatePersonalInfo]);

  // Sync dark mode between stores
  useEffect(() => {
    if (appSettings.darkMode !== isDarkMode) {
      setDarkMode(appSettings.darkMode);
    }
  }, [appSettings.darkMode, isDarkMode, setDarkMode]);

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    updateAppSettings({ darkMode: value });
  };

  const handleSaveSettings = () => {
    Alert.alert("Success", "Settings saved successfully!");
  };

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => signOut(),
      },
    ]);
  };

  const handleExportData = () => {
    Alert.alert("Export", "Data export feature coming soon!");
  };

  const handleBackupData = () => {
    Alert.alert("Backup", "Data backup feature coming soon!");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Personal Information */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Personal Information
          </ThemedText>

          <TextInput
            label="First Name"
            value={personalInfo.firstName}
            onChangeText={(text) => updatePersonalInfo({ firstName: text })}
            variant="outline"
            containerStyle={styles.input}
          />

          <TextInput
            label="Last Name"
            value={personalInfo.lastName}
            onChangeText={(text) => updatePersonalInfo({ lastName: text })}
            variant="outline"
            containerStyle={styles.input}
          />

          <TextInput
            label="Phone Number"
            value={personalInfo.phoneNumber}
            onChangeText={(text) => updatePersonalInfo({ phoneNumber: text })}
            variant="outline"
            containerStyle={styles.input}
            keyboardType="phone-pad"
          />
        </View>

        {/* Business Information */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Business Information
          </ThemedText>

          <TextInput
            label="Business Name"
            value={businessInfo.name}
            onChangeText={(text) => updateBusinessInfo({ name: text })}
            variant="outline"
            containerStyle={styles.input}
          />

          <TextInput
            label="Email"
            value={businessInfo.email}
            onChangeText={(text) => updateBusinessInfo({ email: text })}
            variant="outline"
            containerStyle={styles.input}
            keyboardType="email-address"
          />

          <TextInput
            label="Phone"
            value={businessInfo.phone}
            onChangeText={(text) => updateBusinessInfo({ phone: text })}
            variant="outline"
            containerStyle={styles.input}
            keyboardType="phone-pad"
          />

          <TextInput
            label="Address"
            value={businessInfo.address}
            onChangeText={(text) => updateBusinessInfo({ address: text })}
            variant="outline"
            containerStyle={styles.input}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>App Settings</ThemedText>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon" size={20} color="#007AFF" />
              <ThemedText style={styles.settingLabel}>Dark Mode</ThemedText>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: "#E5E5EA", true: "#34C759" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={20} color="#007AFF" />
              <ThemedText style={styles.settingLabel}>Notifications</ThemedText>
            </View>
            <Switch
              value={appSettings.notifications}
              onValueChange={(value) =>
                updateAppSettings({ notifications: value })
              }
              trackColor={{ false: "#E5E5EA", true: "#34C759" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="save" size={20} color="#007AFF" />
              <ThemedText style={styles.settingLabel}>Auto Save</ThemedText>
            </View>
            <Switch
              value={appSettings.autoSave}
              onValueChange={(value) => updateAppSettings({ autoSave: value })}
              trackColor={{ false: "#E5E5EA", true: "#34C759" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Invoice Settings */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Invoice Settings</ThemedText>

          <TextInput
            label="Invoice Prefix"
            value={invoiceSettings.prefix}
            onChangeText={(text) => updateInvoiceSettings({ prefix: text })}
            variant="outline"
            containerStyle={styles.input}
          />

          <TextInput
            label="Payment Terms"
            value={invoiceSettings.paymentTerms}
            onChangeText={(text) =>
              updateInvoiceSettings({ paymentTerms: text })
            }
            variant="outline"
            containerStyle={styles.input}
          />
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Data Management</ThemedText>

          <Button
            variant="outline"
            onPress={handleExportData}
            style={styles.actionButton}
          >
            <Ionicons name="download-outline" size={18} color="#007AFF" />
            Export Data
          </Button>

          <Button
            variant="outline"
            onPress={handleBackupData}
            style={styles.actionButton}
          >
            <Ionicons name="cloud-upload-outline" size={18} color="#007AFF" />
            Backup Data
          </Button>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Button
            variant="filled"
            onPress={handleSaveSettings}
            style={styles.primaryButton}
          >
            Save Settings
          </Button>

          <Button
            variant="outline"
            onPress={handleSignOut}
            style={[styles.actionButton, styles.signOutButton]}
          >
            <Ionicons name="log-out-outline" size={18} color="#FF3B30" />
            Sign Out
          </Button>
        </View>

        <ResetButtonDevOnly />
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    marginBottom: 8,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingLabel: {
    marginLeft: 12,
    fontSize: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
  primaryButton: {
    marginBottom: 16,
  },
  signOutButton: {
    borderColor: "#FF3B30",
  },
});
