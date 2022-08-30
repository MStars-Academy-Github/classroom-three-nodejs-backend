import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("yutai ch ajiljin");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
