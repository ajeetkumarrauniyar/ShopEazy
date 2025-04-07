import express from "express";
import handleWebhook from "@/webhooks/clerk/clerkWebhook";

const router = express.Router();

router.post(
  "/api/v1/webhooks/clerk",
  express.raw({ type: "application/json" }),
  handleWebhook
);

export default router;
