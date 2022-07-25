const express = require("express");
const router = express.Router();

//<--------> 1. Random 3 books <-------->\\
router.get("/", (req, res, next) => {
  res.send([
    books.books[Math.floor(Math.random() * books.books.length)],
    books.books[Math.floor(Math.random() * books.books.length)],
    books.books[Math.floor(Math.random() * books.books.length)],
  ]);
});

//<--------> 3. Authors <-------->\\
router.get("/authors", (req, res) => {
  let authors = [];
  books.books.map((book) => {
    return authors.push(book.author);
  });
  res.send(authors);
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

module.exports = router;
