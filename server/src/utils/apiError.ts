import { Response } from "express";
import { logger } from "./loggerUtil.ts";

/**
 * Standard API Error class
 * Extends the native Error class with additional properties for API error handling
 */
export class ApiError extends Error {
  statusCode: number;
  data: object | null;
  success: boolean;
  errors: string[] | Error[];
  isOperational: boolean;
  name: string;

  constructor(
    statusCode: number,
    message = "An error occurred",
    errors: string[] | Error[] = [],
    isOperational = true,
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.isOperational = isOperational;
    this.name = "ApiError";

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    logger.error(`API Error: ${this.message}`);
    if (this.errors.length > 0) {
      const errorDetails = this.errors.map((e) => (typeof e === "string" ? e : e.message)).join(", ");
      logger.error(`Error details: ${errorDetails}`);
    }
  }

  /**
   * Convert to ApiResponse and send
   */
  send(res: Response): Response {
    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      data: this.data,
      message: this.message,
      success: this.success,
      errors: this.errors.map((e) => (typeof e === "string" ? e : e.message)),
    });
  }

  /**
   * Static helper methods for common errors
   */
  static badRequest(message = "Bad request", errors: string[] | Error[] = []): ApiError {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = "Unauthorized", errors: string[] | Error[] = []): ApiError {
    return new ApiError(401, message, errors);
  }

  static forbidden(message = "Forbidden", errors: string[] | Error[] = []): ApiError {
    return new ApiError(403, message, errors);
  }

  static notFound(message = "Resource not found", errors: string[] | Error[] = []): ApiError {
    return new ApiError(404, message, errors);
  }

  static internal(message = "Internal server error", errors: string[] | Error[] = []): ApiError {
    return new ApiError(500, message, errors);
  }

  /**
   * Convert any error to ApiError
   */
  static from(error: unknown, defaultMessage = "An error occurred"): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    if (error instanceof Error) {
      return new ApiError(500, error.message || defaultMessage, [error.message || defaultMessage], true, error.stack);
    }

    return new ApiError(500, typeof error === "string" ? error : defaultMessage);
  }
}
