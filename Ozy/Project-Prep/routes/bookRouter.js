const express = require("express");
const bookRouter = express.Router();
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

//<--------> 2. Sort by date <-------->\\
bookRouter.get("/sortbyDate", (req, res, next) => {
  let result = books.books.sort((a, b) =>
    a.published > b.published ? 1 : b.published > a.published ? -1 : 0
  );
  res.render("sortByDate", { result });
});

//<--------> 4. All books <-------->\\
bookRouter.get("/allbooks", (req, res, next) => {
  res.render("allbooks", { books: books.books });
});

//<--------> 5. Search by isbn <-------->\\
bookRouter.get("/isbn/:id", (req, res) => {
  let isbnID = req.params.id;
  let result = books.books.filter((book) => {
    return book.isbn === isbnID;
  });
  res.send(result);
});

//<--------> 7. Search by page(max) <-------->\\
bookRouter.get("/maxPage", (req, res) => {
  let maxPage = books.books.reduce((prev, current) =>
    prev.pages > current.pages ? prev : current
  );
  res.send(maxPage);
});

//<--------> 8. Search by page(min) <-------->\\
bookRouter.get("/minPage", (req, res) => {
  let minPage = books.books.reduce((prev, current) =>
    prev.pages < current.pages ? prev : current
  );
  res.send(minPage);
});

//<--------> 9. Publishers <-------->\\
bookRouter.get("/publishers", (req, res, next) => {
  let publishers = [];
  let count = {};
  books.books.map((book) => {
    publishers.push(book.publisher);
    return;
  });
  for (let i = 0; i < publishers.length; i++) {
    let e = publishers[i];
    if (count[e] == null) {
      count[e] = 1;
    } else {
      count[e]++;
    }
  }
  res.send(count);
});

module.exports = bookRouter;
