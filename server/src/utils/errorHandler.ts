import { Request, Response, NextFunction } from "express";
import { ApiError } from "./apiError.ts";
import { ApiResponse } from "./apiResponse.ts";
import { logger } from "./loggerUtil.ts";

/**
 * Global error handler middleware
 * This middleware catches all errors passed to next() in Express routes
 */
export const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Global error handler caught error: ${err.message}`);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    return err.send(res);
  }

  const apiError = new ApiError(
    500,
    err.message || "Internal server error",
    [err.message || "Unknown error"],
    true,
    err.stack,
  );

  return apiError.send(res);
};

/**
 * 404 Not Found handler middleware
 * This middleware should be placed after all routes to catch undefined routes
 */
export const notFoundHandler = (req: Request, res: Response) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  return ApiResponse.notFound(res, `Route ${req.originalUrl} not found`);
};

/**
 * Validation error handler
 * Helper function to handle validation errors from validation libraries
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleValidationError = (errors: any[]): ApiError => {
  const formattedErrors = errors.map((err) => err.message || String(err));
  return ApiError.badRequest("Validation failed", formattedErrors);
};
