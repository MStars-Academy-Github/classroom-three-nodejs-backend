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
  let books3 = [];
  for (i = 0; i < 3; i++) {
    books3.push(books.books[Math.floor(Math.random() * books.books.length)]);
  }
  res.render("index", { data: books3 });
});

router.get("/books", (req, res, next) => {
  res.render("books", { data: books });
});

router.get("/add", (req, res, next) => {
  res.render("addBook");
});

app.use(router);

app.listen(PORT, () => {
  console.log(`My app is running`);
});
