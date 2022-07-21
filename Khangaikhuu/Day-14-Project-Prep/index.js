const express = require("express");
const validator = require("express-validator");

const router = express.Router();
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");
app.use(router);

router.get("/", (req, res, next) => {
  res.send("Hey Hey!");
});

router.get("/add", (req, res, next) => {
  res.render("addBook");
});

app.listen(PORT, () => {
  console.log("My app is running");
});
