import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const app: Express = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;
app.get("/", (req: Request, res: Response) => {
  res.send("project 2");
});
app.listen(PORT, () => {
  console.log(PORT);
});
