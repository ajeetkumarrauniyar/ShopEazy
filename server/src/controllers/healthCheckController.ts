import { asyncHandler } from "@/utils/index.ts";

/**
 * Health check controller
 * Simple example showing the most concise way to create a controller
 */
export const healthCheck = asyncHandler(async () => {
  return {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});
