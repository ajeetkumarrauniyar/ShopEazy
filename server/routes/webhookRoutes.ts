import express from "express";
import { clerkWebhookService } from "@/services/clerkWebhookService";

const router = express.Router();

router.post("/clerk/webhook", async (req, res) => {
  const event = req.body;

  try {
    if (event.type === "user.created") {
      await clerkWebhookService.handleUserCreated(event.data);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    let errorMessage = "Webhook processing failed";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ message: errorMessage });
  }
});

export default router;
