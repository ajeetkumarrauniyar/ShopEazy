import { Response } from "express";
import { createClerkClient } from "@clerk/express";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});
if (!clerkClient) {
  console.error(
    "Error: Clerk client is not initialized. Please check your configuration."
  );
}

export default clerkClient;
