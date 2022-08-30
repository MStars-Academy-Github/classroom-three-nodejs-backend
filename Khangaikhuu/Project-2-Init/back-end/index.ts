import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

const asdf = "";

app.get("/", (req: Request, res: Response) => {
  res.send("Project 2");
});

app.listen(PORT, () => {
  console.log("server is listening on the port " + PORT);
});
