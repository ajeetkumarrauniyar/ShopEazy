import { Router } from "express";
import { invoiceController } from "@/controllers/invoiceController";
import { isAuthenticated } from "@/middlewares/authMiddleware";

const router = Router();

// Create Invoice
router.post("/", isAuthenticated, (req, res, next) => {
  console.log("User ID from token:", req.auth?.userId);
  console.log("Authorization header:", req.headers.authorization);

  invoiceController.createInvoice(req, res).catch(next);
});

export default router;
