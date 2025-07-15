import { useAuth } from "@clerk/clerk-expo";
import { API_BASE_URL, logNetworkConfig } from "./networkConfig";

// Log the network configuration
logNetworkConfig();

// Helper function to decode JWT payload
const decodeJWTPayload = (token: string) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("❌ Invalid JWT format - not 3 parts");
      return null;
    }

    const payload = parts[1];

    // Add padding if needed for base64 decoding
    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);

    // Use atob() which is available in React Native
    const decoded = atob(paddedPayload);
    const parsed = JSON.parse(decoded);
    return parsed;
  } catch (error) {
    console.error("❌ Failed to decode JWT payload:", error);
    return null;
  }
};

// Types
interface MobileInvoiceLineItem {
  productId?: string;
  productName: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface MobileInvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  saleType: "B2C" | "B2B";
  customerName: string;
  customerGstin?: string;
  customerStation?: string;
  subtotal: number;
  taxAmount: number;
  taxRate: number;
  totalAmount: number;
  lineItems: MobileInvoiceLineItem[];
}

interface SyncResponse {
  success: boolean;
  message: string;
  invoiceId?: string;
  invoiceNumber?: string;
}

/**
 * Hook that provides authenticated API functions
 */
export const useAuthenticatedApi = () => {
  const { getToken, isSignedIn, userId } = useAuth();

  const makeAuthenticatedRequest = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    if (!isSignedIn) {
      throw new Error("User is not signed in");
    }

    console.log(`🔐 Getting auth token for user: ${userId}`);

    // Get the session token from Clerk
    const token = await getToken();

    if (!token) {
      throw new Error("Failed to get authentication token");
    }

    // Enhanced logging for JWT and session information
    console.log(`📡 Making API request to: ${API_BASE_URL}${endpoint}`);
    console.log(`🔐 Token length: ${token.length}`);
    console.log(`🔐 Token preview: ${token.substring(0, 50)}...`);
    console.log(`👤 User ID: ${userId}`);

    // Decode and log JWT payload details
    const payload = decodeJWTPayload(token);
    if (payload) {
      console.log(`📋 JWT Payload Details:`);
      console.log(`  - Session ID (sid): ${payload.sid || "N/A"}`);
      console.log(`  - User ID (sub): ${payload.sub || "N/A"}`);
      console.log(`  - Issuer (iss): ${payload.iss || "N/A"}`);
      console.log(
        `  - Issued At (iat): ${payload.iat ? new Date(payload.iat * 1000).toISOString() : "N/A"}`
      );
      console.log(
        `  - Expires At (exp): ${payload.exp ? new Date(payload.exp * 1000).toISOString() : "N/A"}`
      );
      console.log(`  - Full payload:`, JSON.stringify(payload, null, 2));

      // Check if token is expired
      if (payload.exp) {
        const now = Math.floor(Date.now() / 1000);
        const isExpired = now > payload.exp;
        console.log(`  - Token expired: ${isExpired ? "❌ YES" : "✅ NO"}`);
        if (isExpired) {
          console.warn(`⚠️ WARNING: Token appears to be expired!`);
        }
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    console.log(`📡 Response status: ${response.status}`);
    console.log(
      `📡 Response headers:`,
      JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error Response:`, errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }

      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    const responseData = await response.json();
    console.log(`✅ API Response:`, responseData);
    return responseData;
  };

  const syncInvoiceToServer = async (
    invoiceData: MobileInvoiceData
  ): Promise<SyncResponse> => {
    console.log("📤 Syncing invoice to server:", invoiceData.invoiceNumber);

    try {
      const response = await makeAuthenticatedRequest<SyncResponse>(
        "/invoices/mobile/sync",
        {
          method: "POST",
          body: JSON.stringify(invoiceData),
        }
      );

      console.log("✅ Invoice synced successfully:", response);
      return response;
    } catch (error) {
      console.error("❌ Failed to sync invoice:", error);
      throw error;
    }
  };

  const testAuthEndpoint = async (): Promise<any> => {
    console.log("🧪 Testing authentication endpoint...");

    try {
      const response = await makeAuthenticatedRequest("/health/test-auth", {
        method: "GET",
      });

      console.log("✅ Auth test successful:", response);
      return response;
    } catch (error) {
      console.error("❌ Auth test failed:", error);
      throw error;
    }
  };

  return {
    syncInvoiceToServer,
    testAuthEndpoint,
    makeAuthenticatedRequest,
    isSignedIn,
    userId,
  };
};
