import { Request, Response } from "express";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";

export const userController = {
  /**
   * GET /api/user/me
   * Returns the current authenticated user's data from our DB.
   */
  async getMeController(req: Request, res: Response) {
    try {
      const clerkId = authService.getAuthUserId(req);

      const user = await userService.findUserByClerkId(clerkId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ user });
    } catch (err: any) {
      console.error("getMeController error:", err);
      res
        .status(err.message.includes("Unauthorized") ? 401 : 500)
        .json({ error: err.message });
    }
  },

  /**
   * POST /api/user/sync
   * Updates user data in our database from Clerk data
   */
  async syncUserController(req: Request, res: Response) {
    try {
      const clerkId = authService.getAuthUserId(req);

      const { user: clerkUser } = req.body;

      if (!clerkUser || !clerkUser.id) {
        return res.status(400).json({ error: "Invalid user data provided" });
      }

      // Verify the clerkId from token matches the one in request body
      if (clerkId !== clerkUser.id) {
        return res.status(403).json({ error: "User ID mismatch" });
      }

      const updatedUser = await userService.updateUserFromClerk(
        clerkId,
        clerkUser
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        success: true,
        message: "User data synchronized successfully",
        user: updatedUser,
      });
    } catch (err: any) {
      console.error("syncUserController error:", err);
      res
        .status(err.message.includes("Unauthorized") ? 401 : 500)
        .json({ error: err.message });
    }
  },
};
