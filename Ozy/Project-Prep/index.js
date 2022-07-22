const express = require("express");
const validator = require("express-validator");
const router = express.Router();
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const bookRouter = express.Router();
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const bodyParser = require("body-parser");
let books;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");
app.use(router);
app.use("/books", bookRouter);

readFile("./public/book.json", "utf-8", (err, booksData) => {
  if (err) {
    console.error(err);
  } else {
    books = JSON.parse(booksData);
  }
});

router.get("/", (req, res, next) => {
  res.send([
    books.books[Math.floor(Math.random() * books.books.length)],
    books.books[Math.floor(Math.random() * books.books.length)],
    books.books[Math.floor(Math.random() * books.books.length)],
  ]);
});

router.get("/authors", (req, res) => {
  let authors = [];
  books.books.map((book) => {
    return authors.push(book.author);
  });
  res.send(authors);
});

bookRouter.get("/", (req, res, next) => {
  res.send(books.books);
});
bookRouter.get("/byDate", (req, res, next) => {
  let byDate = books.books;
  let sorted = byDate.sort((a, b) => {
    JSON.stringify(a.published) - JSON.stringify(b.published);
  });
  console.log(sorted);
  // res.send(sorted);
});

bookRouter.get("/isbn/:id", (req, res) => {
  let isbnID = req.params.id;
  let result = books.books.filter((book) => {
    return book.isbn === isbnID;
  });
  res.send(result);
});

bookRouter.get("/maxPage", (req, res) => {
  let maxPage = books.books.reduce((prev, current) =>
    prev.pages > current.pages ? prev : current
  );
  res.send(maxPage);
});
bookRouter.get("/minPage", (req, res) => {
  let minPage = books.books.reduce((prev, current) =>
    prev.pages < current.pages ? prev : current
  );
  res.send(minPage);
});

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

router.get("/add", (req, res) => {
  res.render("addBook");
});

router.post("/add/book", (req, res) => {
  console.log(req.body.isbn);
  res.send("Амжилттай хадгалагдлаа");
});

router.get("/booksdetails", (req, res, next) => {
  res.render("index", { books: books.books });
});
app.listen(PORT, () => {
  console.log("Running");
});
