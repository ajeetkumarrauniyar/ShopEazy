import { createClerkClient } from "@clerk/express";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const userList = await clerkClient.users.getUserList();

export default clerkClient;
