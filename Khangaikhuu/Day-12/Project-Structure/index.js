const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
app.use(express.static("public"));

app.get("/api/foods", (req, res) => {
  res.send("it is serving foods");
});

app.get("/api", (req, res) => {
  res.send("it is working");
});

app.listen(PORT);
console.log("My app is running on port ", PORT);
