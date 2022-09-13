const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes/v1");
const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;
const ATLAS_MONGO_CONNECTION = process.env.ATLAS_MONGO_CONNECTION;
app.use("/v1", routes);
mongoose.connect(ATLAS_MONGO_CONNECTION).then(() => {
  console.log("Connected to the mongoDB");
  app.listen(3000, () => {
    console.log("Server express started port " + PORT);
  });
});
