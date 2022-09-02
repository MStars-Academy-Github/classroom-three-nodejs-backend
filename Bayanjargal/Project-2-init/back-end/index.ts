import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/v1";
const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const ATLAS_MONGO_CONNECTION =
  process.env.ATLAS_MONGO_CONNECTION || "localhost";
app.use(express.json());

app.use("/v1", routes);
let server: any;
mongoose.connect(ATLAS_MONGO_CONNECTION).then(() => {
  console.log("Connect to the mongoDB");
  server = app.listen(PORT, () => {
    console.log("Server is listing port:" + PORT);
  });
});
