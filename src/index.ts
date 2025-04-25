import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

const app: Express = express(); // Fixed type assignment
const port = 4000;

app.use(express.json());

app.use(
  cors({
    origin: "*", // Fixed CORS config
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome to Express Typescript</h1>");
});

// Centralized Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error", // Show actual error message
    data: {},
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`); // Fixed template string
});
