import { Request, Response, NextFunction } from "express";
import { env } from "@/config/index.ts";

// Custom error class for API errors
export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handling middleware
export const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  // Default status code
  const statusCode = (err as ApiError).statusCode || 500;

  console.error(`❌ Error: ${err.message}`);
  if (env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    status: "error",
    message: err.message,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });
  next();
};
