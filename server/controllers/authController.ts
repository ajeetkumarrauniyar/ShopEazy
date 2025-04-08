import { Response } from "express";
import { AuthRequest } from "@/types";
import { userService } from "@/services/userService";

class AuthController {
  async getCurrentUser(req: AuthRequest, res: Response) {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const userData = await userService.getEnrichedUserData(req.user.id);
    res.status(200).json(userData);
  }

  async updateUserProfile(req: AuthRequest, res: Response) {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const updatedUser = await userService.updateUser(req.user.id, req.body);
    res.status(200).json(updatedUser);
  }
}

export const authController = new AuthController();
