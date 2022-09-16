const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes/v1/index");

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/v1", routes);

dotenv.config();
const PORT = process.env.PORT;
const ATLAS_MONGO_SERVER = process.env.ATLAS_MONGO_CONNECTION;

mongoose.connect(ATLAS_MONGO_SERVER).then(() => {
  console.log("Connected to the MongoDB");
  app.listen(PORT, () => {
    console.log("Running server" + PORT);
  });
});
