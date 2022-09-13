const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();
const router = require("./routes/V1/router");
const PORT = process.env.PORT;
const ATLAS_MONGO_CONNECTION = process.env.ATLAS_MONGO_CONNECTION;

app.use(express.json());
app.use("/roles", router);

mongoose.connect(ATLAS_MONGO_CONNECTION).then(() => {
  console.log("Connected to the MongoDB");
  app.listen(PORT, () => {
    console.log("Server is running at " + PORT);
  });
});
