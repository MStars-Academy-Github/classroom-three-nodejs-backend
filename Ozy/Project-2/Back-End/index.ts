import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/v1";

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const ATLAS_MONGO_SERVER = process.env.ATLAS_MONGO_SERVER || "localhost";
app.use(express.json());

app.use("/v1", routes);

let server: any;
mongoose.connect(ATLAS_MONGO_SERVER).then(() => {
  console.log("Connected to the MongoDB");
  server = app.listen(PORT, () => {
    console.log("Server is running at " + PORT);
  });
});
