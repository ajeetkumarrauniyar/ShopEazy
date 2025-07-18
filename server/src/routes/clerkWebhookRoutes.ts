import express from "express";
import { clerkWebhookController } from "@/controllers/clerkWebhookController.ts";

const clerkRouter = express.Router();

clerkRouter.post("/", clerkWebhookController);

export default clerkRouter;
