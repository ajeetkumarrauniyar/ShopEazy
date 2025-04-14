import express from "express";
import { clerkWebhookController } from "@/controllers/clerkWebhookController";

const clerkRouter = express.Router();

clerkRouter.post("/", clerkWebhookController);

export default clerkRouter;
