import { Request, Response, NextFunction, RequestHandler } from "express";
import { ApiError } from "./apiError.ts";
import { ApiResponse } from "./apiResponse.ts";
import { logger } from "./loggerUtil.ts";

/**
 * Type for async request handler functions
 * This includes all parameter possibilities to make it more flexible
 */
export type AsyncFunction =
  // Standard handler with all parameters
  | ((req: Request, res: Response, next: NextFunction) => Promise<unknown>)
  // Handler with just req and res
  | ((req: Request, res: Response) => Promise<unknown>)
  // Handler with no parameters (for simplified usage)
  | (() => Promise<unknown>);

/**
 * Enhanced async handler that properly integrates with ApiResponse and ApiError
 * Returns a properly typed RequestHandler for use with Express routes
 * @param fn - The async function to wrap
 * @returns A RequestHandler that catches errors and formats responses
 * @throws ApiError - If the function throws an ApiError, it will be sent as a response
 * @throws Error - If the function throws a standard Error, it will be converted to an ApiError
 * @throws unknown - If the function throws an unknown error, it will be converted to an ApiError
 */

export const asyncHandler = (fn: AsyncFunction): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info(`Processing ${req.method} request to ${req.originalUrl}`);

      // Execute the handler function with appropriate parameters
      const result = await fn(req, res, next);

      // If response is already sent or a next() has been explicitly called
      if (res.headersSent) {
        return;
      }

      // If the handler returns a value and the response hasn't been sent yet,
      // treat it as data for a success response
      if (result !== undefined) {
        ApiResponse.success(res, result);
        return;
      }
    } catch (error: unknown) {
      logger.error(`Error in route handler: ${req.method} ${req.originalUrl}`);

      // Handle ApiError instances
      if (error instanceof ApiError) {
        error.send(res);
        return;
      }

      // Handle standard Error instances
      if (error instanceof Error) {
        const apiError = new ApiError(500, error.message, [error.message], true, error.stack);
        apiError.send(res);
        return;
      }

      // Handle unknown errors
      const apiError = new ApiError(500, String(error));
      apiError.send(res);
      return;
    }
  };
};
