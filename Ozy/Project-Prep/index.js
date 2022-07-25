const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const router = require("./routes/api");
const bookRouter = require("./routes/bookRouter");
const { userValidationRules, validate } = require("./validator");

app.use(express.json());
app.use("/api", router);
app.use("/books", bookRouter);
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
let books;

readFile("./public/book.json", "utf-8", (err, booksData) => {
  if (err) {
    console.error(err);
  } else {
    books = JSON.parse(booksData);
  }
});
app.listen(PORT, () => {
  console.log("Running");
});

//******/ Server side rendering 1 \******\\

//<--------> 1. Add new book <-------->\\
router.get("/add", (req, res) => {
  res.render("addBook");
});

router.post("/add", userValidationRules(), validate, (req, res, next) => {});

//<--------> 2. Details of books <-------->\\

router.get("/booksdetails", (req, res) => {
  res.render("index", { books: books.books });
});

//******/ Server side rendering 2\******\\

//<--------> 1. Delete book <-------->\\
router.post("/booksdetails/:isbn", (req, res) => {
  let delIsbn = req.params.isbn;
  let result = books.books.filter((book) => {
    return book.isbn != delIsbn;
  });
  res.render("index", { books: result });
});
