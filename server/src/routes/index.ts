import { Router } from "express";
import healthRoutes from "./healthRoute.ts";
import userRoutes from "./userRoutes.ts";
import invoiceRoutes from "./invoiceRoutes.ts";

const router = Router();

// Register all routes
router.use("/v1/health", healthRoutes);

router.use("/v1/users", userRoutes);

// router.use("/auth", authRoutes);

router.use("/v1/invoices", invoiceRoutes);

// Export the main router
export default router;
