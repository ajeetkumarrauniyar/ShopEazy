import express from "express";
import cors from "cors";
import config from "~/config.json" with { type: "json" };
import { env, validateEnv, prisma } from "@/config/index.ts";
import { logger, loggerMiddleware, something } from "@/utils/index.ts";
import routes from "@/routes/index.js";

// Validate environment variables
validateEnv();

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: env.CORS_ORIGIN,
  methods: "GET,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(loggerMiddleware);
app.use(cors(corsOptions));

// Root route
app.get("/", (req, res) => {
  res.send(`Hello, ${something()}! App: ${config.appName}`);
});

// Register all routes
app.use("/api", routes);

// Error handling middleware
// app.use(errorHandler);

// Not found middleware
// app.use(notFoundHandler());

export { app, prisma, env, logger };
