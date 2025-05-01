import dotenv from "dotenv";
dotenv.config();

if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode.");
  dotenv.config({ path: ".prod.env" });
} else {
  console.log("Running in development mode.");
  dotenv.config({ path: ".dev.env" });
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY!,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,
  CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SIGNING_SECRET!,
  DATABASE_URL: process.env.DATABASE_URL!,
};
