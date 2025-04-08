import express from "express";
import { authController } from "@/controllers/authController";
import { protectedRoute, getUserDetails } from "@/middlewares/authMiddleware";

const router = express.Router();

router.get("/me", protectedRoute, getUserDetails, async (req, res, next) => {
  try {
    await authController.getCurrentUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/update-profile",
  protectedRoute,
  getUserDetails,
  async (req, res, next) => {
    try {
      await authController.updateUserProfile(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

