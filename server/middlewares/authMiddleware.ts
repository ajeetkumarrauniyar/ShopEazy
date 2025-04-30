import { Request, Response, NextFunction } from "express";
import { AuthObject } from "@clerk/express";
import { clerkClient } from "@/config/clerkClientConfig";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if req.auth is already populated by Clerk's middleware (cookie-based)
    if (req.auth && req.auth.userId) {
      console.log("User authenticated via cookie");
      return next();
    }

    // Check for Authorization header (token-based)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No Authorization header or invalid format");
      return res.status(401).json({ error: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Attempting token verification");

    // Create headers for authentication
    const headers = new Headers();
    headers.set("authorization", `Bearer ${token}`);

    // Use the correct parameters for authenticateRequest
    const requestState = await clerkClient.authenticateRequest(req, {
      jwtKey: process.env.CLERK_JWT_KEY,
      authorizedParties: [
        "http://localhost:3000",
        "https://credible-seemingly-caribou.ngrok-free.app",
      ],
    });

    const auth = requestState.toAuth();
    if (auth) {
      req.auth = auth as AuthObject;
    }

    if (!req.auth?.userId) {
      console.error("Token verification failed: No user found with this token");
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    console.log("Token verification successful");
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
