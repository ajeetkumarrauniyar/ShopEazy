import { Request, Response } from "express";
import { Webhook } from "svix";
import { env } from "@/config/envConfig";
import { ClerkWebhookEvent } from "@/types/clerk";

/**
 * Verifies the incoming Clerk webhook request using Svix
 * @param req - Express request object
 * @returns Verified webhook event
 * @throws Error if verification fails or headers are missing
 */

export const verifyClerkWebhook = async (
  req: Request,
  res: Response
): Promise<ClerkWebhookEvent> => {
  const SIGNING_SECRET = env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    console.error("❌ Missing SIGNING_SECRET in env");
    throw new Error("Server misconfiguration: Missing webhook secret");
  }

  const svix = new Webhook(SIGNING_SECRET);

  const payload =
    req.body instanceof Buffer
      ? req.body.toString("utf8")
      : JSON.stringify(req.body);
  const headers = req.headers;

  const svixId = headers["svix-id"] as string;
  const svixTimestamp = headers["svix-timestamp"] as string;
  const svixSignature = headers["svix-signature"] as string;

  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error("❌ Missing required svix headers");
    throw new Error("Missing required svix headers");
  }

  // Add timestamp validation to prevent replay attacks
  const MAX_WEBHOOK_AGE = 5 * 60 * 1000; // 5 minutes

  // Validate timestamp to prevent replay attacks
  const timestamp = Number.parseInt(svixTimestamp, 10);
  const now = Date.now() / 1000;
  if (Math.abs(now - timestamp) > MAX_WEBHOOK_AGE / 1000) {
    console.error("❌ Webhook too old or from future:", svixTimestamp);
    throw new Error("Webhook timestamp validation failed");
  }

  let evt: ClerkWebhookEvent;

  try {
    evt = svix.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
    console.log("✅ Webhook verified successfully:", evt.type);
    return evt;
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    throw new Error("Invalid webhook signature");
  }
};
