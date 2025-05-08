import { Response } from "express";
import { logger } from "./loggerUtil.ts";

/**
 * Standard API Response class
 * Handles formatting and sending consistent API responses
 */
export class ApiResponse {
  statusCode: number;
  data: object | null;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: object | null, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;

    // Log the response based on success/failure
    if (this.success) {
      logger.info(`✅ API Response: ${this.message}`);
    } else {
      logger.error(`❌ API Response Error: ${this.message}`);
    }
  }

  /**
   * Send the response to the client
   */
  send(res: Response): Response {
    return res.status(this.statusCode).json(this);
  }

  /**
   * Static helper methods for common responses
   */
  static success(res: Response, data: object | null = null, message = "Success", statusCode = 200): Response {
    return new ApiResponse(statusCode, data, message).send(res);
  }

  static error(res: Response, message = "Error occurred", statusCode = 500, data: object | null = null): Response {
    return new ApiResponse(statusCode, data, message).send(res);
  }

  static notFound(res: Response, message = "Resource not found"): Response {
    return new ApiResponse(404, null, message).send(res);
  }

  static badRequest(res: Response, message = "Bad request"): Response {
    return new ApiResponse(400, null, message).send(res);
  }

  static unauthorized(res: Response, message = "Unauthorized"): Response {
    return new ApiResponse(401, null, message).send(res);
  }

  static forbidden(res: Response, message = "Forbidden"): Response {
    return new ApiResponse(403, null, message).send(res);
  }
}
