import { Request, Response } from "express";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/express";
import { env } from "@/config/envConfig";

/**
 * Verifies the incoming Clerk webhook request using Svix
 * @param req - Express request object
 * @returns Verified webhook event
 * @throws Error if verification fails or headers are missing
 */

// server/utils/handleClerkWebhook.ts
export const handleClerkWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const SIGNING_SECRET = env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    console.error("❌ Missing SIGNING_SECRET in env");
    res.status(500).json({
      success: false,
      message: "Server misconfiguration",
    });
    return;
  }

  const svix = new Webhook(SIGNING_SECRET);
  const payload =
    typeof req.body === "string" ? req.body : JSON.stringify(req.body);
  const headers = req.headers;

  const svixId = headers["svix-id"] as string;
  const svixTimestamp = headers["svix-timestamp"] as string;
  const svixSignature = headers["svix-signature"] as string;

  if (!svixId || !svixTimestamp || !svixSignature) {
    res.status(400).json({
      success: false,
      message: "Missing required svix headers",
    });
    return;
  }

  let evt: WebhookEvent;

  try {
    evt = svix.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    res
      .status(400)
      .json({ success: false, message: "Invalid webhook signature" });
    return;
  }

  const eventType = evt.type;
  const user = evt.data;

  if (eventType === "user.created") {
    console.log("✅ Clerk user.created event received:", user.id);
    // TODO: Call Supabase/Prisma/DB insert logic here
  }

  res
    .status(200)
    .json({ success: true, message: `Webhook received: ${eventType}` });
};
