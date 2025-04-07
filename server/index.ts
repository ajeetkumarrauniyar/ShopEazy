import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/webhookRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
