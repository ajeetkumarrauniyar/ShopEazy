import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@clerk/express";
import { ApiError, logger } from "@/utils/index.ts";

export interface AuthenticatedRequest extends Request {
  auth: {
    userId: string;
    sessionId: string;
  };
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

    // Log the token (first part for security)
    logger.info(`[Auth] Received JWT token: ${token.substring(0, 20)}...`);

    try {
      const secretKey = process.env.CLERK_SECRET_KEY;
      if (!secretKey) {
        throw ApiError.unauthorized("Clerk secret key not configured");
      }

      // Networkless JWT verification
      const payload = await verifyToken(token, { secretKey });

      // Checking issuer after verification:
      if (!payload.iss || !payload.iss.startsWith("https://") || !payload.iss.includes("clerk.accounts.dev")) {
        throw ApiError.unauthorized("Invalid token issuer");
      }

      logger.info(
        `[Auth] Successfully verified JWT payload: ${JSON.stringify({
          ...payload,
          sub: payload.sub ? `${String(payload.sub).substring(0, 8)}...` : undefined,
        })}`,
      );

      // Extract user ID and session ID from the verified payload
      if (!payload.sub || typeof payload.sub !== "string") {
        throw ApiError.unauthorized("Invalid token - missing or invalid user ID");
      }

      if (!payload.sid || typeof payload.sid !== "string") {
        throw ApiError.unauthorized("Invalid token - missing or invalid session ID");
      }

      // Add the authenticated user info to the request
      (req as AuthenticatedRequest).auth = {
        userId: payload.sub,
        sessionId: payload.sid,
      };

      logger.info(`[Auth] Successfully authenticated user: ${payload.sub}`);
      next();
    } catch (verificationError) {
      logger.error("JWT verification failed:", verificationError);

      // Handle specific verification errors
      if ((verificationError as Error).message?.includes("expired")) {
        throw ApiError.unauthorized("Token has expired");
      }

      if ((verificationError as Error).message?.includes("invalid")) {
        throw ApiError.unauthorized("Invalid token");
      }

      throw ApiError.unauthorized("Token verification failed");
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
