import express from "express";
import { clerkWebhookController } from "@/controllers/clerkWebhookController";

const clerkRouter = express.Router();

clerkRouter.post("/clerk", clerkWebhookController);

export default clerkRouter;
