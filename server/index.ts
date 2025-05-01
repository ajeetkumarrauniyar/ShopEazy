import express, { Request, Response } from "express";
import cors from "cors";
import { env } from "@/config/envConfig";
import { validateEnv } from "@/config/validateEnv";
import clerkRouter from "@/routes/clerkWebhookRoutes";
import userRoutes from "@/routes/userRoutes";
import invoiceRoutes from "@/routes/invoiceRoutes";
import { errorHandler } from "@/middlewares/errorHandler";
import { clerkMiddleware } from "@clerk/express";

validateEnv();

const app = express();
const port = env.PORT;

console.log("Clerk Secret Key:", process.env.CLERK_SECRET_KEY?.slice(0, 10) + "...");
app.use(clerkMiddleware())

//CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8081",
  "https://credible-seemingly-caribou.ngrok-free.app",
];

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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-Clerk-Auth",
    ],
  })
);

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
app.use((req, res, next) => {
  console.log(`[Express] ${req.method} ${req.path}`);
  if (req.auth?.userId) {
    console.log(`[Express] Clerk User ID: ${req.auth.userId}`);
  } else {
    console.log(`[Express] No Clerk User`);
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

// Add a catch-all handler for authentication redirects
app.use((req: Request, res: Response) => {
  // If this is a redirect from Clerk authentication
  if (req.method === "GET" && req.path === "/") {
    res.status(401).json({
      error: "Authentication failed",
      message: "Please provide a valid authentication token",
    });
    return;
  }

  // Otherwise 404
  res.status(404).json({ error: "Not found" });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
