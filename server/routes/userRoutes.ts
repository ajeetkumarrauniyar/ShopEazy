import { Router } from "express";
import { userController } from "@/controllers/userController";
import { isAuthenticated } from "@/middlewares/authMiddleware";

const router = Router();

/**
 * requireAuth() - Verify Clerk session cookie
 */

// GET current user
router.get("/me", isAuthenticated, (req, res, next) => {
  userController.getMeController(req, res).catch(next);
});

// POST sync user data from Clerk
router.post("/sync", isAuthenticated, (req, res, next) => {
  userController.syncUserController(req, res).catch(next);
});

export default router;
