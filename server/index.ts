import express, { Request, Response } from "express";
import cors from "cors";
import { env } from "@/config/envConfig";
import clerkRouter from "@/routes/clerkWebhookRoutes";

const app = express();
const port = env.PORT;

// Middlewares
app.use(
  cors({
    origin: process.env.NEXT_ADMIN_FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Handle raw body for webhook verification
app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }));

app.use(function (req, res, next) {
  if (req.originalUrl === "/api/webhooks/clerk") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/health", async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "ok", message: "Server is running & Health is OK!!" });
});

// Webhook route
app.use("/api/webhooks/clerk", clerkRouter);

app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
