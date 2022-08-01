const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("my app is runnig ");
});

app.listen(PORT, () => {
  console.log("my app is running");
});
