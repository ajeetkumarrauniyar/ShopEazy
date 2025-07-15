import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "@/components/ui/Button";
import { useAuthenticatedApi } from "@/services/authApiService";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@clerk/clerk-expo";

interface JWTPayload {
  sid?: string;
  exp?: number;
  iat?: number;
  sub?: string;
  iss?: string;
  [key: string]: unknown;
}

export default function AuthTestComponent() {
  const { testAuthEndpoint, syncInvoiceToServer, isSignedIn, userId } =
    useAuthenticatedApi();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<string>("");
  const [jwtToken, setJwtToken] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [jwtPayload, setJwtPayload] = useState<JWTPayload | null>(null);

  // Helper function to decode JWT payload
  const decodeJWTPayload = (token: string): JWTPayload | null => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        console.error("❌ Invalid JWT format - not 3 parts");
        return null;
      }

      const payload = parts[1];

      // Add padding if needed for base64 decoding
      const paddedPayload =
        payload + "=".repeat((4 - (payload.length % 4)) % 4);

      // Use atob() which is available in React Native
      const decoded = atob(paddedPayload);
      const parsed = JSON.parse(decoded);

      console.log("🔍 JWT Payload decoded:", JSON.stringify(parsed, null, 2));
      return parsed;
    } catch (error) {
      console.error("❌ Failed to decode JWT payload:", error);
      return null;
    }
  };

  // Function to refresh token and session info
  const refreshTokenInfo = async () => {
    if (!isSignedIn) {
      setJwtToken("");
      setSessionId("");
      setJwtPayload(null);
      return;
    }

    try {
      const token = await getToken();
      if (token) {
        setJwtToken(token);

        const payload = decodeJWTPayload(token);
        setJwtPayload(payload);

        if (payload?.sid) {
          setSessionId(payload.sid);
          console.log("🔐 Session ID (sid):", payload.sid);
        }

        console.log("🔐 Full JWT Token:", token);
        console.log("🔐 JWT Token Preview:", `${token.substring(0, 50)}...`);
        console.log("🔐 JWT Token Length:", token.length);

        if (payload) {
          console.log("📋 JWT Payload Details:");
          console.log("  - Session ID (sid):", payload.sid);
          console.log("  - User ID (sub):", payload.sub);
          console.log("  - Issuer (iss):", payload.iss);
          console.log(
            "  - Issued At (iat):",
            payload.iat ? new Date(payload.iat * 1000).toISOString() : "N/A"
          );
          console.log(
            "  - Expires At (exp):",
            payload.exp ? new Date(payload.exp * 1000).toISOString() : "N/A"
          );
        }
      }
    } catch (error) {
      console.error("❌ Failed to get token:", error);
    }
  };

  // Refresh token info when component mounts and when sign-in status changes
  useEffect(() => {
    refreshTokenInfo();
  }, [isSignedIn]);

  const handleTestAuth = async () => {
    setIsLoading(true);
    try {
      // Refresh token info before making the request
      await refreshTokenInfo();

      const response = await testAuthEndpoint();
      setLastResponse(JSON.stringify(response, null, 2));
      Alert.alert("✅ Success", "Authentication test passed!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setLastResponse(`Error: ${errorMessage}`);
      Alert.alert("❌ Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestInvoiceSync = async () => {
    setIsLoading(true);
    try {
      // Refresh token info before making the request
      await refreshTokenInfo();

      const testInvoice = {
        invoiceNumber: `TEST-${Date.now()}`,
        invoiceDate: new Date().toISOString(),
        saleType: "B2C" as const,
        customerName: "Test Customer",
        customerGstin: "29ABCDE1234F1Z5",
        customerStation: "Test Station",
        subtotal: 1000,
        taxAmount: 180,
        taxRate: 18,
        totalAmount: 1180,
        lineItems: [
          {
            productName: "Test Product",
            quantity: 1,
            rate: 1000,
            amount: 1000,
          },
        ],
      };

      const response = await syncInvoiceToServer(testInvoice);
      setLastResponse(JSON.stringify(response, null, 2));
      Alert.alert("✅ Success", "Invoice sync test passed!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setLastResponse(`Error: ${errorMessage}`);
      Alert.alert("❌ Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshToken = () => {
    refreshTokenInfo();
    Alert.alert("🔄 Refreshed", "Token information updated!");
  };

  if (!isSignedIn) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>⚠️ Not Signed In</ThemedText>
        <ThemedText>Please sign in to test API authentication</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>🔐 API Authentication Test</ThemedText>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <ThemedText style={styles.info}>User ID: {userId}</ThemedText>
        <ThemedText style={styles.info}>
          Session ID (sid): {sessionId || "Loading..."}
        </ThemedText>
        <ThemedText style={styles.info}>
          JWT Preview:{" "}
          {jwtToken ? `${jwtToken.substring(0, 30)}...` : "Loading..."}
        </ThemedText>
        <ThemedText style={styles.info}>
          JWT Length: {jwtToken.length || 0} chars
        </ThemedText>

        {jwtPayload && (
          <View style={styles.payloadContainer}>
            <ThemedText style={styles.payloadTitle}>JWT Payload:</ThemedText>
            <ThemedText style={styles.payloadText}>
              • Expires:{" "}
              {jwtPayload.exp
                ? new Date(jwtPayload.exp * 1000).toLocaleString()
                : "N/A"}
            </ThemedText>
            <ThemedText style={styles.payloadText}>
              • Issued:{" "}
              {jwtPayload.iat
                ? new Date(jwtPayload.iat * 1000).toLocaleString()
                : "N/A"}
            </ThemedText>
            <ThemedText style={styles.payloadText}>
              • Issuer: {jwtPayload.iss || "N/A"}
            </ThemedText>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={handleRefreshToken} style={styles.button}>
          🔄 Refresh Token Info
        </Button>

        <Button
          onPress={handleTestAuth}
          loading={isLoading}
          style={styles.button}
        >
          Test Auth Endpoint
        </Button>

        <Button
          onPress={handleTestInvoiceSync}
          loading={isLoading}
          style={styles.button}
        >
          Test Invoice Sync
        </Button>
      </View>

      {lastResponse && (
        <View style={styles.responseContainer}>
          <ThemedText style={styles.responseTitle}>Last Response:</ThemedText>
          <Text style={styles.responseText}>{lastResponse}</Text>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  info: {
    fontSize: 13,
    marginBottom: 5,
    fontFamily: "monospace",
  },
  payloadContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  payloadTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  payloadText: {
    fontSize: 12,
    marginBottom: 2,
    opacity: 0.8,
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 20,
  },
  button: {
    marginVertical: 5,
  },
  responseContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  responseTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  responseText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#333",
  },
});
