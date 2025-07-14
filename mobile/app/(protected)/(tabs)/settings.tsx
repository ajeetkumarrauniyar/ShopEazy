import ResetButtonDevOnly from "@/components/ResetButtonDevOnly";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { useSettingsStore } from "@/stores";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Switch, View } from "react-native";

export default function Settings() {
  const { signOut } = useAuth();
  const { user } = useUser();

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
        {/* User Info */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Account
          </ThemedText>

          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color="#007AFF" />
            </View>
            <View style={styles.userDetails}>
              <ThemedText style={styles.userName}>
                {`${user?.firstName} ${user?.lastName}` || "User Name"}
              </ThemedText>
              <ThemedText style={styles.userEmail}>
                {user?.primaryEmailAddress?.emailAddress || "user@example.com"}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Personal Information
          </ThemedText>

          <TextInput
            label="First Name"
            value={personalInfo.firstName}
            onChangeText={(firstName) => updatePersonalInfo({ firstName })}
            placeholder="Enter your first name"
            variant="outline"
            containerStyle={styles.inputContainer}
          />

          <TextInput
            label="Last Name"
            value={personalInfo.lastName}
            onChangeText={(lastName) => updatePersonalInfo({ lastName })}
            placeholder="Enter your last name"
            variant="outline"
            containerStyle={styles.inputContainer}
          />

          <TextInput
            label="Phone Number"
            value={personalInfo.phoneNumber}
            onChangeText={(phoneNumber) => updatePersonalInfo({ phoneNumber })}
            placeholder="(555) 123-4567"
            variant="outline"
            keyboardType="phone-pad"
            containerStyle={styles.inputContainer}
          />
        </View>

        {/* Business Information */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Business Information
          </ThemedText>

          <TextInput
            label="Business Name"
            value={businessInfo.name}
            onChangeText={(name) => updateBusinessInfo({ name })}
            placeholder="Your Business Name"
            variant="outline"
            containerStyle={styles.inputContainer}
          />

          <TextInput
            label="Business Email"
            value={businessInfo.email}
            onChangeText={(email) => updateBusinessInfo({ email })}
            placeholder="business@example.com"
            variant="outline"
            keyboardType="email-address"
            containerStyle={styles.inputContainer}
          />

          <TextInput
            label="Business Phone"
            value={businessInfo.phone}
            onChangeText={(phone) => updateBusinessInfo({ phone })}
            placeholder="(555) 123-4567"
            variant="outline"
            keyboardType="phone-pad"
            containerStyle={styles.inputContainer}
          />

          <TextInput
            label="Business Address"
            value={businessInfo.address}
            onChangeText={(address) => updateBusinessInfo({ address })}
            placeholder="Business address"
            variant="outline"
            multiline
            numberOfLines={3}
            containerStyle={styles.inputContainer}
          />
        </View>

        {/* Invoice Settings */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Invoice Settings
          </ThemedText>

          <TextInput
            label="Invoice Prefix"
            value={invoiceSettings.prefix}
            onChangeText={(prefix) => updateInvoiceSettings({ prefix })}
            placeholder="INV"
            variant="outline"
            containerStyle={styles.inputContainer}
          />

          <TextInput
            label="Payment Terms"
            value={invoiceSettings.paymentTerms}
            onChangeText={(paymentTerms) => updateInvoiceSettings({ paymentTerms })}
            placeholder="Net 30"
            variant="outline"
            containerStyle={styles.inputContainer}
          />
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            App Settings
          </ThemedText>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={20} color="#007AFF" />
              <View style={styles.settingText}>
                <ThemedText style={styles.settingLabel}>Notifications</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Receive push notifications
                </ThemedText>
              </View>
            </View>
            <Switch
              value={appSettings.notifications}
              onValueChange={(notifications) => updateAppSettings({ notifications })}
              trackColor={{ false: "#767577", true: "#007AFF" }}
              thumbColor="#f4f3f4"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="save" size={20} color="#007AFF" />
              <View style={styles.settingText}>
                <ThemedText style={styles.settingLabel}>Auto Save</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Automatically save drafts
                </ThemedText>
              </View>
            </View>
            <Switch
              value={appSettings.autoSave}
              onValueChange={(autoSave) => updateAppSettings({ autoSave })}
              trackColor={{ false: "#767577", true: "#007AFF" }}
              thumbColor="#f4f3f4"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon" size={20} color="#007AFF" />
              <View style={styles.settingText}>
                <ThemedText style={styles.settingLabel}>Dark Mode</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Use dark theme
                </ThemedText>
              </View>
            </View>
            <Switch
              value={appSettings.darkMode}
              onValueChange={(darkMode) => updateAppSettings({ darkMode })}
              trackColor={{ false: "#767577", true: "#007AFF" }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Data Management
          </ThemedText>

          <Button
            variant="outline"
            onPress={handleExportData}
            style={styles.dataButton}
          >
            <Ionicons name="download" size={20} color="#007AFF" />
            Export Data
          </Button>

          <Button
            variant="outline"
            onPress={handleBackupData}
            style={styles.dataButton}
          >
            <Ionicons name="cloud-upload" size={20} color="#007AFF" />
            Backup Data
          </Button>
        </View>

        {/* Save Settings */}
        <View style={styles.section}>
          <Button
            variant="filled"
            onPress={handleSaveSettings}
            style={styles.saveButton}
          >
            Save Settings
          </Button>
        </View>

        {/* Sign Out */}
        <View style={styles.section}>
          <Button
            variant="outline"
            onPress={handleSignOut}
            style={styles.signOutButton}
          >
            <Ionicons name="log-out" size={20} color="#FF3B30" />
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
    marginBottom: 16,
    fontWeight: "600",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 122, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  inputContainer: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0, 122, 255, 0.05)",
    borderRadius: 8,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    opacity: 0.6,
  },
  dataButton: {
    marginBottom: 12,
  },
  saveButton: {
    marginBottom: 12,
  },
  signOutButton: {
    borderColor: "#FF3B30",
  },
});
