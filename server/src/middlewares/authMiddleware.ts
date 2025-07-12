import { Request, Response, NextFunction } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { ApiError, logger } from "@/utils/index.ts";

export interface AuthenticatedRequest extends Request {
  auth: {
    userId: string;
    sessionId: string;
  };
}

interface JWTPayload {
  sid?: string;
  [key: string]: unknown;
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers.authorization;
    logger.info(`Processing authentication request`);

    if (!authHeader) {
      throw ApiError.unauthorized("Authorization header is missing");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Invalid authorization format. Must be Bearer token");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw ApiError.unauthorized("Token is missing in Authorization header");
    }

    let sessionId: string;

    try {
      // Split the token into parts
      const tokenParts = token.split(".");

      if (tokenParts.length !== 3) {
        throw ApiError.unauthorized("Invalid JWT token format");
      }

      // Decode the payload (second part)
      let payload: JWTPayload;
      try {
        const base64Payload = tokenParts[1];
        const decodedPayload = Buffer.from(base64Payload, "base64").toString();
        payload = JSON.parse(decodedPayload);
      } catch (decodeError) {
        logger.error("Failed to decode JWT payload:", decodeError);
        throw ApiError.unauthorized("Invalid token format - could not decode payload");
      }

      // Extract and validate session ID
      if (!payload.sid || typeof payload.sid !== "string") {
        throw ApiError.unauthorized("Invalid token - missing or invalid session ID");
      }

      sessionId = payload.sid;
    } catch (tokenError) {
      if (tokenError instanceof ApiError) {
        throw tokenError;
      }
      logger.error("Token processing error:", tokenError);
      throw ApiError.unauthorized("Failed to process authentication token");
    }

    try {
      // Verify the session with Clerk
      const session = await clerkClient.sessions.verifySession(sessionId, token);

      if (!session.userId) {
        throw ApiError.unauthorized("Invalid session - user ID not found");
      }

      // Add the authenticated user info to the request
      (req as AuthenticatedRequest).auth = {
        userId: session.userId,
        sessionId: session.id,
      };

      logger.info(`Successfully authenticated user: ${session.userId}`);
      next();
    } catch (clerkError) {
      logger.error("Clerk session verification failed:", clerkError);

      // Handle specific Clerk errors if needed
      if ((clerkError as Error).message?.includes("expired")) {
        throw ApiError.unauthorized("Session has expired");
      }

      throw ApiError.unauthorized("Session verification failed");
    }
  } catch (error) {
    // Log the full error for debugging but send a sanitized response
    logger.error("Authentication error:", error);

    if (error instanceof ApiError) {
      next(error);
    } else {
      next(ApiError.unauthorized("Authentication failed"));
    }
  }
};
