import { clerkMiddleware, createClerkClient } from "@clerk/express";

// Auth middleware for Express
export const clerkAuthMiddleware = clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY!,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
});
if (!clerkAuthMiddleware) {
  console.error(
    "Error: Clerk middleware is not initialized. Please check your configuration."
  );
}

// Clerk API client for calling Clerk server API
export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});
if (!clerkClient) {
  console.error(
    "Error: Clerk client is not initialized. Please check your configuration."
  );
}


