import express from "express";
import { createInvoice } from "@/controllers/index.ts";
import { requireAuth } from "@/middlewares/index.ts";

const router = express.Router();

// Protected route - requires authentication
router.post("/", requireAuth, createInvoice);

export default router;
