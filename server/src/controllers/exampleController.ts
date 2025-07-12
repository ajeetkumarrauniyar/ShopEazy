import { Request, Response } from "express";
import { asyncHandler, ApiResponse, ApiError } from "@/utils/index.ts";

/**
 * Health check controller
 * Simple example showing the most concise way to create a controller
 */
export const healthCheck = asyncHandler(async () => {
  // Just return the data - asyncHandler automatically creates a success response
  return {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});

/**
 * Example controller with different response scenarios
 */
export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  // Validation example
  if (!userId) {
    throw ApiError.badRequest("User ID is required");
  }

  try {
    // Simulate database lookup & different error scenarios
    // In a real application, you would replace this with actual database logic
    if (userId === "404") {
      throw ApiError.notFound(`User with ID ${userId} not found`);
    }

    if (userId === "403") {
      throw ApiError.forbidden("You don't have permission to access this user");
    }

    if (userId === "500") {
      throw new Error("Database connection error");
    }

    // Example of explicit response with custom status code
    if (userId === "custom") {
      return ApiResponse.success(res, { id: userId, name: "Custom User", type: "special" }, "Custom response", 201);
    }

    // Default success case - just return data
    return {
      id: userId,
      name: "Example User",
      email: "user@example.com",
      role: "user",
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    // Re-throw ApiErrors
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle other errors
    throw ApiError.internal("Error retrieving user profile", [(error as Error).message]);
  }
});

/**
 * Example of a controller with manual response handling
 */
export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  // Validation
  const errors = [];
  if (!name) errors.push("Name is required");
  if (!description) errors.push("Description is required");

  if (errors.length > 0) {
    throw ApiError.badRequest("Validation failed", errors);
  }

  // Process the request
  const newItem = {
    id: Date.now().toString(),
    name,
    description,
    createdAt: new Date(),
  };

  // Return response using manual approach
  ApiResponse.success(res, newItem, "Item created successfully", 201);

  // Note: No return statement here since we've manually handled the response
});
