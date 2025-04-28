import { Request, Response, NextFunction } from "express";

// Custom middleware to check for authentication
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // req.auth is populated by the global clerkMiddleware
  if (!req.auth || !req.auth.userId) {
    // If no user ID exists on req.auth, the user is not authenticated
    res.status(401).json({ error: "Unauthenticated: Access Denied" });
    return;
  }
  // If authenticated, proceed to the next middleware or route handler
  next();
};
// // src/middlewares/authMiddleware.ts
// import { Request, Response, NextFunction } from "express";
// import { clerkClient } from "@clerk/clerk-sdk-node";

// export const isAuthenticated = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Check if req.auth is populated by clerk middleware (web clients using session cookies)
//     if (req.auth && req.auth.userId) {
//       return next();
//     }

//     // Check for token in Authorization header (mobile clients)
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Authentication required" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//       // Verify the token with Clerk
//       const { payload } = await clerkClient.verifyToken(token);

//       if (!payload) {
//         return res.status(401).json({ error: "Invalid or expired token" });
//       }
//       // If token is valid, set auth info manually to mimic clerkMiddleware behavior
//       req.auth = {
//         userId: payload.sub,
//         sessionId: payload.sid,
//         // You can add other properties from payload as needed
//       };

//       return next();
//     } catch (error) {
//       console.error("Token verification failed:", error);
//       return res.status(401).json({ error: "Invalid or expired token" });
//     }
//   } catch (error) {
//     console.error("Auth middleware error:", error);
//     return res.status(500).json({ error: "Authentication error" });
//   }
// };
