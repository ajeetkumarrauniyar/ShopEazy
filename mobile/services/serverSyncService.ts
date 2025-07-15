import { Platform } from "react-native";

// Configuration for your server
const SERVER_BASE_URL = __DEV__
  ? Platform.OS === "ios"
    ? "http://localhost:5000"
    : "http://10.0.2.2:5000"
  : "https://your-production-server.com";

const API_BASE_URL = `${SERVER_BASE_URL}/api/v1`;

// Types matching the server expectations
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

interface MobileSyncQueueItem {
  tableName: string;
  rowId: number;
  action: "INSERT" | "UPDATE" | "DELETE";
  payload: string;
}

interface SyncResponse {
  success: boolean;
  message: string;
  invoiceId?: string;
  invoiceNumber?: string;
}

interface BatchSyncResponse {
  success: boolean;
  message: string;
  syncedItems: number;
  errors: {
    operation: MobileSyncQueueItem;
    error: string;
  }[];
}

/**
 * Get authentication token from Clerk
 */
async function getAuthToken(): Promise<string> {
  try {
    const token = await getAuthToken();
    //TODO:  Implement your authentication logic here
    throw new Error(
      "This function should be called from a component with access to useAuth"
    );
  } catch (error) {
    console.error("❌ Failed to get auth token:", error);
    throw error;
  }
}

/**
 * Make authenticated API request with provided token
 */
async function apiRequest<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  console.log(`📡 Making API request to: ${API_BASE_URL}${endpoint}`);
  console.log(`🔐 Using token: ${token.substring(0, 20)}...`);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  console.log(`📡 Response status: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`❌ API Error:`, errorData);
    throw new Error(
      errorData.message || `HTTP ${response.status}: ${response.statusText}`
    );
  }

  const responseData = await response.json();
  console.log(`✅ API Response:`, responseData);
  return responseData;
}

/**
 * Sync a single invoice to the server
 */
export async function syncInvoiceToServer(
  invoiceData: MobileInvoiceData,
  token: string
): Promise<SyncResponse> {
  console.log("📤 Syncing invoice to server:", invoiceData.invoiceNumber);

  try {
    const response = await apiRequest<SyncResponse>(
      "/invoices/mobile/sync",
      token,
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
}

/**
 * Sync multiple operations in batch
 */
export async function syncBatchToServer(
  token: string,
  operations: MobileSyncQueueItem[]
): Promise<BatchSyncResponse> {
  console.log(`📤 Syncing batch of ${operations.length} operations to server`);

  try {
    const response = await apiRequest<BatchSyncResponse>(
      "/invoices/mobile/sync/batch",
      token,
      {
        method: "POST",
        body: JSON.stringify({ operations }),
      }
    );

    console.log("✅ Batch synced successfully:", response);
    return response;
  } catch (error) {
    console.error("❌ Failed to sync batch:", error);
    throw error;
  }
}
