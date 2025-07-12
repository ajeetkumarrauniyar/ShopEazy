import { AddressInfo } from "net";
import { app, prisma, env, logger } from "./app.ts";

// Start server
const port = parseInt(env.PORT);
const server = app.listen(port, () => {
  const addr = server.address() as AddressInfo;
  console.log(`\n==============================================`);
  logger.info(`🚀 Server started successfully on ${addr.address}:${addr.port}`);
  logger.info(`💻 Running on PORT: ${env.PORT}`);
  logger.info(`🌐 Server running on ${env.API_URL}`);
  console.log(`==============================================`);
});

// Handle server error
server.on("error", (err: NodeJS.ErrnoException) => {
  logger.error(`❌ Failed to start server on port ${port}: ${err.message}`);
  process.exit(1);
});

// Try DB connection at startup
prisma
  .$connect()
  .then(() => {
    console.log(`\n==============================================`);
    logger.info("✅ Connected to database successfully");
    console.log(`==============================================`);
  })
  .catch((error) => {
    logger.error(`❌ Database connection error: ${error.message}`);
    logger.warn("⚠️ App starting without database connection");
    console.log(`==============================================`);
  });

// Graceful shutdown
process.on("SIGINT", async () => {
  logger.info("SIGINT signal received: closing HTTP server and database connections");

  server.close(async () => {
    logger.info("HTTP server closed");

    try {
      await prisma.$disconnect();
      logger.info("Database connections closed");
      process.exit(0);
    } catch (error) {
      logger.error(`Error during database disconnect: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });
});
