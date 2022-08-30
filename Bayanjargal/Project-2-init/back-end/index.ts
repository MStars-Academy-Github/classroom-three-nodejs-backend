import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Project 2");
});

app.listen(PORT, () => {
  console.log("Server is listing port:" + PORT);
});
