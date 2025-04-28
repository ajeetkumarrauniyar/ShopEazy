import { env } from "@/config/envConfig";

export function validateEnv() {
  const requiredVars = [
    "PORT",
    "CLERK_WEBHOOK_SECRET",
    "DATABASE_URL",
    // Add other required env vars
  ];

  const missing = requiredVars.filter((key) => !env[key as keyof typeof env]);

  if (missing.length > 0) {
    console.error(
      "❌ Missing required environment variables:",
      missing.join(", ")
    );
    process.exit(1);
  }

  console.log("✅ Environment variables validated");
}
