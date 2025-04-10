import express, { Request, Response } from "express";
import cors from "cors";
import { env } from "@/config/envConfig";
import { clerkClient } from "@clerk/express";
import { handleClerkWebhook } from "@/utils/handleClerkWebhook";

// import { authMiddleware } from "@/middlewares/authMiddleware";
// import protectedRoutes from "@/routes/protectedRoutes";

const app = express();
const port = env.PORT;

// Middlewares
app.use("/webhook/clerk", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(cors());

// app.use(express.urlencoded({ extended: true }));
// app.use(authMiddleware);

// app.use(
//   cors({
//     origin: process.env.NEXT_ADMIN_FRONTEND_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );

// Routes
app.get("/", async (req: Request, res: Response) => {
  try {
    const { data } = await clerkClient.users.getUserList();
    res.status(200).json({ users: data });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Webhook route
app.post("/api/webhooks/clerk", handleClerkWebhook);

app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
