import express from "express";
import { createInvoice, syncMobileInvoice, syncMobileBatch } from "@/controllers/index.ts";
import { requireAuth } from "@/middlewares/index.ts";

const router = express.Router();

router.post("/", requireAuth, createInvoice);

// Mobile sync routes
router.post("/mobile/sync", requireAuth, syncMobileInvoice);
router.post("/mobile/sync/batch", requireAuth, syncMobileBatch);

export default router;
