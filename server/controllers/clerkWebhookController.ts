import { Request, Response } from "express";
import { verifyClerkWebhook } from "@/utils/handleClerkWebhookUtils";
import { handleClerkWebhookEvent } from "@/services/clerkWebhookService";

export const clerkWebhookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const evt = await verifyClerkWebhook(req, res);
    await handleClerkWebhookEvent(evt);
    res.status(200).json({ success: true, message: `Handled ${evt.type}` });
  } catch (error) {
    console.error("Webhook Error:", error);
    res
      .status(400)
      .json({
        success: false,
        message: (error as Error).message || "Unknown error occurred",
      });
  }
};
