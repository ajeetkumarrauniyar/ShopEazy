import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "@/routes/authRoutes";
import { authMiddleware } from "@/middlewares/authMiddleware";
// import { clerkMiddleware, requireAuth } from "@clerk/express";
// import clerkClient from "@/config/clerkConfig";

const app = express();

app.use(
  cors({
    origin: process.env.NEXT_ADMIN_FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Important for cookies/auth
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authMiddleware);

// // clerkMiddleware is required to be set in the middleware chain before req.auth is used
// app.use(clerkMiddleware());

// app.use(router);

// // Middleware to get user details and attach to request
// export const getUserDetails = async (req, res, next) => {
//   try {
//     if (!req.auth || !req.auth.userId) {
//       return next();
//     }

//     // Get detailed user info from Clerk
//     const user = await clerkClient.users.getUser(req.auth.userId);

//     // Attach user to request object
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error getting user details:", error);
//     next();
//   }
// };

// // Enable raw body parsing for webhook verification
// // app.use(
// //   bodyParser.json({
// //     verify: (req: any, res, buf) => {
// //       req.rawBody = buf;
// //     },
// //   })
// // );

// // app.use("/api", clerkWebhookService);

// // This route is protected and requires authentication
// app.get("/protected", requireAuth(), (req: Request, res: Response) => {
//   res.send("This is a protected route");
// });

// // This route is not protected and can be accessed without authentication
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
