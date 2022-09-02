import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/V1";

const app: Express = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;
const ATLAS_MONGO_CONNECTION =
  process.env.ATLAS_MONGO_CONNECTION || "localhost";

app.use("/v1", routes);

let server: any;
mongoose.connect(ATLAS_MONGO_CONNECTION).then(() => {
  console.log("connected to the MongoDB");
  app.listen(PORT, () => {
    console.log(PORT);
  });
});
