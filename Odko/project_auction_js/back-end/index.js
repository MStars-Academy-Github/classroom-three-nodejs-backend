const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const router = require("./routes/V1/router");

require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/roles", router);

const PORT = process.env.PORT;
const ATLAS_MONGO_CONNECTION = process.env.ATLAS_MONGO_CONNECTION;

mongoose.connect(ATLAS_MONGO_CONNECTION).then(() => {
  console.log("Connected to the MongoDB");
  app.listen(PORT, () => {
    console.log("Server is running at " + PORT);
  });
});
