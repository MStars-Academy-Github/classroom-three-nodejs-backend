const express = require("express");
const router = express.Router();
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const bookRouter = express.Router();
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const { del } = require("request");
let books;

app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");
app.use(router);
app.use("/books", bookRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log("Running");
});

readFile("./public/book.json", "utf-8", (err, booksData) => {
  if (err) {
    console.error(err);
  } else {
    books = JSON.parse(booksData);
  }
});

//******/ APIs   \******\\

//<--------> 1. Random 3 books <-------->\\
router.get("/", (req, res, next) => {
  res.send([
    books.books[Math.floor(Math.random() * books.books.length)],
    books.books[Math.floor(Math.random() * books.books.length)],
    books.books[Math.floor(Math.random() * books.books.length)],
  ]);
});

//<--------> 2. Sort by date <-------->\\
bookRouter.get("/byDate", (req, res, next) => {
  let byDate = books.books;
  let sorted = byDate.sort((a, b) => {
    JSON.stringify(a.published) - JSON.stringify(b.published);
  });
  console.log(sorted);
});

//<--------> 3. Authors <-------->\\
router.get("/authors", (req, res) => {
  let authors = [];
  books.books.map((book) => {
    return authors.push(book.author);
  });
  res.send(authors);
});

//<--------> 4. All books <-------->\\
bookRouter.get("/", (req, res, next) => {
  res.send(books.books);
});

//<--------> 5. Search by isbn <-------->\\
bookRouter.get("/isbn/:id", (req, res) => {
  let isbnID = req.params.id;
  let result = books.books.filter((book) => {
    return book.isbn === isbnID;
  });
  res.send(result);
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

//******/ Server side rendering 1 \******\\

//<--------> 1. Add new book <-------->\\
router.get("/add", (req, res) => {
  res.render("addBook");
});

const userValidationRules = () => {
  return [
    body("isbn").isLength({ min: 10, max: 13 }).withMessage("Only numbers"),
    body("title").isString().withMessage("Only letters"),
    body("subtitle").isString().withMessage("Only letters"),
    body("author").isString().withMessage("Only letters"),
    body("published").isDate().withMessage("Enter Date"),
    body("publisher").isString().withMessage("Only letters"),
    body("pages").isInt().withMessage("Only numbers"),
    body("description").isString().withMessage("Only letters"),
    body("website").isString().withMessage("Only letters"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.render("errors", {
    errors: extractedErrors,
  });
};

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
  res.redirect("/booksdetails");
});
