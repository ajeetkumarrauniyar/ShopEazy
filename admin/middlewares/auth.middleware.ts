import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import type { RequestHandler } from "express";

export const authMiddleware: RequestHandler = ClerkExpressRequireAuth({
  onError: (error) => {
    throw new Error(`Authentication failed: ${error}`);
  },
}) as unknown as RequestHandler;

export const getUserId = (req: any): string => {
  const userId = req.auth.userId;
  if (!userId) throw new Error("User not authenticated");
  return userId;
};
