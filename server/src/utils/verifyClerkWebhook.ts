import { Webhook } from "svix";
import { ApiError, logger } from "@/utils/index.ts";
import { Request } from "express";

const FIVE_MINUTES = 5 * 60 * 1000;

export async function verifyClerkWebhook(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET_KEY;
  if (!secret) {
    logger.error("Missing Clerk webhook secret");
    throw ApiError.internal("Webhook secret not configured");
  }

  // Required Svix headers
  const svixId = req.headers["svix-id"];
  const svixTimestamp = req.headers["svix-timestamp"];
  const svixSignature = req.headers["svix-signature"];

  if (!svixId || !svixTimestamp || !svixSignature) {
    logger.error("❌ Missing required Svix headers");
    throw ApiError.badRequest("Missing required headers");
  }

  // Timestamp validation (prevent replay attacks)
  const now = Date.now();
  const timestampMs = Number(svixTimestamp) * 1000;
  if (isNaN(timestampMs) || Math.abs(now - timestampMs) > FIVE_MINUTES) {
    logger.error("❌ Webhook timestamp is too old or invalid");
    throw ApiError.unauthorized("Webhook timestamp is too old or invalid");
  }

  try {
    const wh = new Webhook(secret);
    const payload = await wh.verify(JSON.stringify(req.body), {
      "svix-id": svixId as string,
      "svix-timestamp": svixTimestamp as string,
      "svix-signature": svixSignature as string,
    });
    return payload;
  } catch (error) {
    logger.error("❌ Webhook signature verification failed", error);
    throw ApiError.unauthorized("Webhook signature verification failed");
  }
}
