import * as dotenv from "dotenv";
import { resolve } from "path";

// Load the root .env file
dotenv.config({ path: resolve(__dirname, "../../../.env") });

export const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;