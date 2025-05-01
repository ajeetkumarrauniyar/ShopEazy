import express from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import invoiceRoutes from "@/routes/invoiceRoutes";
import { errorHandler } from "@/middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authMiddleware);
app.use("/api/invoices", invoiceRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
