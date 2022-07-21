const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config();
const PORT = process.env.PORT;

router.get("/userinfo/:id", (req, res, next) => {
  res.send("User Info with ID");
});
router.use("/user", (req, res, next) => {
  res.send("User Info");
});

app.use("/", router);

app.listen(PORT, () => {
  console.log("Running");
});
