import { Router, Response } from "express";
import { healthCheck } from "@/controllers/index.ts";
import { asyncHandler, logger } from "@/utils/index.ts";
import { requireAuth, AuthenticatedRequest } from "@/middlewares/authMiddleware.ts";

const router = Router();

// Health check endpoint
router.get("/", healthCheck);

// Auth test endpoint
router.get(
  "/test-auth",
  requireAuth,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    // Log successful auth
    logger.info("[Auth Test] Successfully authenticated request");

    // Return user info from auth object
    return res.json({
      success: true,
      message: "Authentication successful",
      userId: req.auth.userId,
      timestamp: new Date().toISOString(),
    });
  }),
);

export default router;
