import { Client, Databases, ID } from 'appwrite';

// Appwrite configuration
const client = new Client();

// You'll need to replace these with your actual Appwrite project details
// For demo purposes, using placeholder values
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'your-project-id';
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'ruralledger-db';
const APPWRITE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID || 'waitlist';

client
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

// Waitlist data interface
export interface WaitlistEntry {
  email?: string;
  phone: string;
  userType: 'shopkeeper' | 'accountant' | 'staff';
  createdAt: string;
  source?: string;
  referralCode?: string;
}

// Function to save waitlist entry
export const saveWaitlistEntry = async (data: Omit<WaitlistEntry, 'createdAt'>) => {
  try {
    const entry: WaitlistEntry = {
      ...data,
      createdAt: new Date().toISOString(),
      source: 'landing-page'
    };

    const response = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      ID.unique(),
      entry
    );

    return {
      success: true,
      data: response,
      message: 'Successfully added to waitlist!'
    };
  } catch (error: any) {
    console.error('Error saving waitlist entry:', error);
    
    // Handle specific Appwrite errors
    if (error.code === 409) {
      return {
        success: false,
        error: 'This phone number is already registered.',
        code: 'DUPLICATE_ENTRY'
      };
    }
    
    if (error.code === 401) {
      return {
        success: false,
        error: 'Configuration error. Please try again later.',
        code: 'AUTH_ERROR'
      };
    }

    return {
      success: false,
      error: 'Failed to join waitlist. Please try again.',
      code: 'UNKNOWN_ERROR'
    };
  }
};

// Function to get waitlist stats (optional - for admin dashboard)
export const getWaitlistStats = async () => {
  try {
    const response = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID
    );

    const stats = {
      total: response.total,
      shopkeepers: response.documents.filter(doc => doc.userType === 'shopkeeper').length,
      accountants: response.documents.filter(doc => doc.userType === 'accountant').length,
      staff: response.documents.filter(doc => doc.userType === 'staff').length,
    };

    return { success: true, stats };
  } catch (error) {
    console.error('Error fetching waitlist stats:', error);
    return { success: false, error: 'Failed to fetch stats' };
  }
};

export { client };