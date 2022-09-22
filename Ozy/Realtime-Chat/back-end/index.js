const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const MONGO_SERVER = process.env.ATLAS_MONGO_SERVER;

const http = require("http");
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.json("root path");
});

mongoose.connect(MONGO_SERVER).then(() => {
  console.log("Conneted MongoDB");
  server.listen(PORT, () => {
    console.log("Server running at " + PORT);
  });
});
