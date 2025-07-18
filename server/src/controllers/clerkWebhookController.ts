import { Request, Response } from "express";
import { verifyClerkWebhook, ApiError, logger } from "@/utils/index.ts";
import { handleClerkWebhookEvent } from "@/services/index.ts";

export const clerkWebhookController = async (req: Request, res: Response): Promise<void> => {
  try {
    const evt = await verifyClerkWebhook(req);
    await handleClerkWebhookEvent(evt);

    logger.info(`Successfully handled Clerk webhook: ${evt.type}`);
    res.status(200).json({
      success: true,
      message: `Handled ${evt.type}`,
    });
  } catch (error) {
    logger.error("Webhook Error:", error);

    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    } else {
      res.status(400).json({
        success: false,
        message: (error as Error).message || "Unknown error occurred",
      });
    }
  }
};
