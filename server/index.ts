import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { env } from "@/config/envConfig";
import { validateEnv } from "@/config/validateEnv";
import clerkRouter from "@/routes/clerkWebhookRoutes";
import userRoutes from "@/routes/userRoutes";
import invoiceRoutes from "@/routes/invoiceRoutes";
import { errorHandler } from "@/middlewares/errorHandler";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const port = env.PORT;

validateEnv();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8081",
  "https://credible-seemingly-caribou.ngrok-free.app",
];

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// Clerk middleware for auth
app.use(clerkMiddleware());

// Handle raw body for webhook verification
app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }));

// Parse normal JSON for other routes
app.use(function (req, res, next) {
  if (req.originalUrl === "/api/webhooks/clerk") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true }));

// Log requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[Express] ${req.method} ${req.path}`);
  // Log req.auth *after* clerkMiddleware has run
  if (req.auth && req.auth.userId) {
    console.log(`[Express] Clerk Auth User ID: ${req.auth.userId}`);
  } else if (req.headers.authorization) {
    console.log(
      `[Express] Auth header present but req.auth not populated (or no userId): ${req.headers.authorization.substring(
        0,
        15
      )}...`
    );
  } else {
    console.log(`[Express] No auth header`);
  }
  next();
});

// Health Route
app.get("/health", async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "ok", message: "Server is running & Health is OK!!" });
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/invoice", invoiceRoutes);

// Webhook route
app.use("/api/webhooks/clerk", clerkRouter);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
