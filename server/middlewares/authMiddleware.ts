import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@clerk/backend";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Log all headers for debugging
    console.log("[Auth] Headers:", JSON.stringify(req.headers, null, 2));

    const authHeader = req.headers.authorization || "";
    console.log("[Auth] Authorization header exists:", !!authHeader);
    console.log("[Auth] Authorization header:", authHeader);

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      res.status(401).json({ error: "Missing Bearer token" });
      return;
    }

    // Print environment info
    console.log(
      "[Auth] Using CLERK_SECRET_KEY with prefix:",
      process.env.CLERK_SECRET_KEY?.substring(0, 10)
    );

    try {
      const verifyResult = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
      });
      const { payload, sessionId, userId } = verifyResult;

      console.log(`[Auth] Token verified successfully for user: ${userId}`);

      req.auth = {
        sessionId: sessionId as string | null,
        userId: userId as string | null,
        token,
        payload,
      };

      next();
    } catch (err) {
      console.error("Token verification failed:", err);
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error: any) {
    console.error("[AuthMiddleware] Token verification failed:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
