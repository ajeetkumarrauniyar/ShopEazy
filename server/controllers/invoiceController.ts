import { Request, Response } from "express";
import { invoiceService } from "@/services/invoiceService";
import { authService } from "@/services/authService"; // For getting clerkId

export const invoiceController = {
  /**
   * POST /api/invoice
   * Create a new invoice for the authenticated user
   */
  async createInvoice(req: Request, res: Response) {
    try {
      const clerkId = authService.getAuthUserId(req);
      console.log("Received invoice from Clerk user:", req.auth?.userId);

      const { invoiceDate, products } = req.body;

      if (!products || products.length === 0) {
        return res.status(400).json({ error: "No products provided" });
      }

      const invoice = await invoiceService.createInvoice(clerkId, {
        invoiceDate,
        products,
      });

      res.status(201).json({
        success: true,
        message: "Invoice created successfully",
        invoice,
      });
    } catch (err: any) {
      console.error("createInvoice error:", err);
      res
        .status(err.message.includes("Unauthorized") ? 401 : 500)
        .json({ error: err.message });
    }
  },
};
