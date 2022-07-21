const express = require("express");
const validator = require("express-validator");
const router = express.Router();
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const books = require("./public/books.json");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });

router.get("/", (req, res, next) => {
  let temp = books;
  const shuffled = books.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 3);
  console.log(selected);

  res.render("index", { data: books });
});
router.get("/add", (req, res, next) => {
  res.render("addBook");
});

app.use(router);

app.listen(PORT, () => {
  console.log(`My app is running`);
});
