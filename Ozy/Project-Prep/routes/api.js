const express = require("express");
const router = express.Router();
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

//<--------> 1. Random 3 books <-------->\\
router.get("/", (req, res, next) => {
  res.render("home", {
    randomBook_01: books.books[Math.floor(Math.random() * books.books.length)],
    randomBook_02: books.books[Math.floor(Math.random() * books.books.length)],
    randomBook_03: books.books[Math.floor(Math.random() * books.books.length)],
  });
});

//<--------> 3. Authors <-------->\\
router.get("/authors", (req, res) => {
  let authors = [];
  books.books.map((book) => {
    return authors.push(book.author);
  });
  res.render("authors", { authors });
});

//<--------> 6. Search by Title(query param) <-------->\\
router.get("/search", (req, res) => {
  let title = req.query.title;
  const result = books.books.filter((book) => {
    return Object.values(book.title)
      .join("")
      .toLowerCase()
      .includes(title.toLowerCase());
  });
  res.send(result);
});
//******/ Server side rendering 1 \******\\

//<--------> 1. Add new book <-------->\\
router.get("/add", (req, res) => {
  res.render("addBook");
});

// router.post("/add", userValidationRules(), validate, (req, res, next) => {});

//<--------> 2. Details of books <-------->\\

router.get("/booksdetails", (req, res) => {
  res.render("index", { books: books.books });
});

//******/ Server side rendering 2\******\\

//<--------> 1. Delete book <-------->\\
// router.post("/booksdetails/:isbn", (req, res) => {
//   let delIsbn = req.params.isbn;
//   let result = books.books.filter((book) => {
//     return book.isbn != delIsbn;
//   });
//   res.render("index", { books: result });
// });

module.exports = router;
