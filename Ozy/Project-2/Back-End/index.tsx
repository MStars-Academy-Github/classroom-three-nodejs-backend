import express, { Express } from "express";
import dotenv from "dotenv";

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
