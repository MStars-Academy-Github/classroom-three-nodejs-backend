const express = require("express");
const validator = require("express-validator");
const router = express.Router();
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const bookRouter = express.Router();
const fs = require("fs");

app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");
app.use(router);
app.use("/books", bookRouter);

bookRouter.get("/", (req, res, next) => {});

router.get("/add", (req, res, next) => {
  res.render("addBook");
});

app.listen(PORT, () => {
  console.log("Running");
});
