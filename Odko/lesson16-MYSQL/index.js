const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const router = express.Router();

app.use(express.json());

router.get("/", (req, res, next) => {
  res.send("Node client bolgohin tuld mysql2-iig suulgana");
});

app.use(router);
app.listen(PORT, () => {
  console.log("my app");
});
