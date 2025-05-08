import { Request, Response } from "express";
import { prisma } from "@/config/index.ts";
import { asyncHandler, ApiResponse, ApiError } from "@/utils/index.ts";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body as { name: string; email: string; password: string };

  // Validation
  if (!name || !email) {
    throw new ApiError(400, "Name and Email are required");
  }
  if (password && password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const newUser = await prisma.user.create({
    data: { name, email, password },
  }); // In a real application, you should hash the password before saving it

  if (!newUser) {
    throw new ApiError(500, "Failed to create user");
  }

  ApiResponse.success(res, newUser, "User created successfully", 201);
});
