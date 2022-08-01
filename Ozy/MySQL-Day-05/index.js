const express = require("express");
const app = express();
require("dotenv").config();
const router = express.Router();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Running");
});

app.listen(PORT, () => {
  console.log("Running");
});
