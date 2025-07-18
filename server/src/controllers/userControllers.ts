import { Request, Response } from "express";
import { asyncHandler, ApiResponse, ApiError, logger } from "@/utils/index.ts";
import { userService } from "@/services/index.ts";

/**
 * Get or create user by Clerk ID (for mobile sync)
 */
export const getOrCreateUserByClerkId = asyncHandler(async (req: Request, res: Response) => {
  const { clerkId } = req.params;

  if (!clerkId) {
    throw ApiError.badRequest("Clerk ID is required");
  }

  try {
    const user = await userService.getOrCreateUser(clerkId);
    return ApiResponse.success(res, user, "User retrieved/created successfully");
  } catch (error) {
    logger.error("Error in getOrCreateUserByClerkId:", error);
    throw ApiError.from(error, "Failed to get/create user");
  }
});

/**
 * Get user by Clerk ID
 */
export const getUserByClerkId = asyncHandler(async (req: Request, res: Response) => {
  const { clerkId } = req.params;

  if (!clerkId) {
    throw ApiError.badRequest("Clerk ID is required");
  }

  const user = await userService.findUserByClerkId(clerkId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return ApiResponse.success(res, user, "User found successfully");
});

/**
 * Get all users
 */
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await userService.findAllUsers();
    logger.info("Fetched all users");
    return ApiResponse.success(res, users, "Users retrieved successfully");
  } catch (error) {
    logger.error("Error fetching all users:", error);
    throw ApiError.from(error, "Failed to retrieve users");
  }
});

/**
 * Get user by database ID
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw ApiError.badRequest("User ID is required");
  }

  try {
    const user = await userService.findUserById(id);

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    logger.info(`Fetched user with ID: ${id}`);
    return ApiResponse.success(res, user, "User retrieved successfully");
  } catch (error) {
    logger.error(`Error fetching user by id ${id}:`, error);
    throw ApiError.from(error, "Failed to retrieve user");
  }
});
