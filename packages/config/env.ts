import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// Export needed variables
export const DATABASE_URL = process.env.DATABASE_URL;
export const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
export const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
export const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
export const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
// etc.
