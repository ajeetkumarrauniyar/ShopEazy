import { getAuth } from "@clerk/express";
import { Request } from "express";

export const authService = {
  /**
   * Extracts and returns the Clerk userId from an authenticated request.
   * Throws if the user is not authenticated.
   */
  getAuthUserId(req: Request): string {
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized: No valid session");
    return userId;
  },
};


