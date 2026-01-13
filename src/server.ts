import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { postsRouter } from './routes/post.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/posts", postsRouter);

// 중앙 에러 핸들러
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));