import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { invoiceController } from "@/controllers/invoiceController";

const router = Router();

// Create Invoice
router.post("/", requireAuth(), (req, res, next) => {
  invoiceController.createInvoice(req, res).catch(next);
});

export default router;
