import { NextFunction, Response } from "express";
import { clerkClient, clerkMiddleware, requireAuth } from "@clerk/express";
import { AuthRequest } from "@/types/index";

export const authMiddleware = clerkMiddleware();

export const protectedRoute = requireAuth();

export const getUserDetails = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.auth?.userId) return next();

    const user = await clerkClient.users.getUser(req.auth.userId);
    req.user = {
      id: req.auth.userId,
      clerkId: req.auth.userId,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
    };

    next();
  } catch (error) {
    next(error);
  }
};
