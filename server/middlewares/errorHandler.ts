import type { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  status?: number;
  code?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;

  // Create a sanitized error response
  const errorResponse = {
    success: false,
    message: err.message || "Internal Server Error",
    code: err.code,
    // Only include stack trace in development
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  };

  // Log the error (would use a proper logger in production)
  console.error(`[ERROR] ${req.method} ${req.path}:`, {
    statusCode,
    message: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json(errorResponse);
};

// Helper to create typed errors
export const createError = (
  message: string,
  status = 400,
  code?: string
): AppError => {
  const error: AppError = new Error(message);
  error.status = status;
  if (code) error.code = code;
  return error;
};
