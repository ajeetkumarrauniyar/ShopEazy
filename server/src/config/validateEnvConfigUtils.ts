import dotenv from "dotenv";
import { logger } from "@/utils/index.ts";

dotenv.config();

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === "production") {
  console.log(`==============================================`);
  logger.info("🔧 Running in production mode.");
  dotenv.config({ path: ".env.prod" });
} else {
  console.log(`==============================================`);
  logger.info("🛠️ Running in development mode.");
  dotenv.config({ path: ".env.dev" });
}

interface Env {
  PORT: string;
  NODE_ENV: string;
  API_URL: string;
  CORS_ORIGIN: string;
  DATABASE_URL: string;
  CLERK_SECRET_KEY: string;
  CLERK_PUBLISHABLE_KEY: string;
  CLERK_WEBHOOK_SECRET_KEY: string;
  // Add other required environment variables here
}

export const env: Env = {
  PORT: process.env.PORT || "7000",
  NODE_ENV: process.env.NODE_ENV || "development",
  API_URL: process.env.API_URL || "http://localhost:7000",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || "",
  CLERK_WEBHOOK_SECRET_KEY: process.env.CLERK_WEBHOOK_SECRET_KEY || "",
  // Add other environment variables here
};

/**
 * Validates the required environment variables.
 * Throws an error if any required variable is missing or invalid.
 */
export function validateEnv(): void {
  const requiredEnvVars: (keyof Env)[] = [
    "PORT",
    "NODE_ENV",
    "DATABASE_URL",
    "CLERK_SECRET_KEY",
    "CLERK_PUBLISHABLE_KEY",
    "CLERK_WEBHOOK_SECRET_KEY",
    // Add other required env var
  ];

  const missingEnvVars = requiredEnvVars.filter((key) => !env[key]);

  if (missingEnvVars.length > 0) {
    logger.error(`❌ Missing required environment variables: ${missingEnvVars.join(", ")}`);
    throw new Error(`❌ Missing required environment variables: ${missingEnvVars.join(", ")}`);
  }

  if (isNaN(Number(env.PORT))) {
    logger.error(`❌ Invalid PORT value: ${env.PORT}. Must be a number.`);
    throw new Error(`❌ Invalid PORT value: ${env.PORT}. Must be a number.`);
  }

  if (env.NODE_ENV !== "development" && env.NODE_ENV !== "production") {
    logger.error(`❌ Invalid NODE_ENV value: ${env.NODE_ENV}. Must be 'development' or 'production'.`);
    throw new Error(`❌ Invalid NODE_ENV value: ${env.NODE_ENV}. Must be 'development' or 'production'.`);
  }

  // For development, we'll make this check optional
  if (env.NODE_ENV === "production" && !env.DATABASE_URL.startsWith("postgresql://")) {
    logger.error(`❌ Invalid DATABASE_URL: Must be a valid PostgreSQL connection string.`);
    throw new Error(`❌ Invalid DATABASE_URL: Must be a valid PostgreSQL connection string.`);
  }

  logger.info("✅ Environment variables validated");
  console.log(`==============================================`);
}
