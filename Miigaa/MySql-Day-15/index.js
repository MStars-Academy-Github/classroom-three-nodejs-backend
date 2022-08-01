const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("My app is running");
});

app.listen(PORT, () => {
  console.log("MY app is running");
});
