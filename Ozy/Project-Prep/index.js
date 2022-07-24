const express = require("express");
const fastestValidator = require("fastest-validator");
const router = express.Router();
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const bookRouter = express.Router();
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const bodyParser = require("body-parser");
const v = new fastestValidator();
const expressSession = require("express-session");
let books;

app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");
app.use(router);
app.use("/books", bookRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: "thisissecret",
    saveUninitialized: false,
    resave: false,
  })
);
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

//******/ Server side rendering \******\\

//<--------> 1. Add new book <-------->\\
router.get("/add", (req, res) => {
  res.render("addBook");
  req.session.isbnerror = null;
  req.session.success = null;
});

const schema = {
  isnb: { type: "number", min: 13, max: 13 },
  title: { type: "string" },
  subtitle: { type: "string" },
  author: { type: "string" },
  published: { type: "date" },
  publisher: { type: "string" },
  pages: { type: "number" },
  description: { type: "string" },
  website: { type: "string" },
};

router.post("/add", (req, res) => {
  let isbn = req.body.isbn;
  let title = req.body.title;
  let subtitle = req.body.subtitle;
  let author = req.body.author;
  let published = req.body.published;
  let publisher = req.body.publisher;
  let pages = req.body.pages;
  let description = req.body.description;
  let website = req.body.website;
  const check = v.compile(schema);
  const result = check({
    isbn: isbn,
    title: title,
    subtitle: subtitle,
    author: author,
    published: published,
    publisher: publisher,
    pages: pages,
    description: description,
    website: website,
  });
  if (result) {
    req.session.success = true;
    res.redirect("/add");
  } else {
    req.session.isbnerror = result[0];
    req.session.success = false;
  }
});

//<--------> 2. Details of books <-------->\\
router.get("/booksdetails", (req, res) => {
  res.render("index", { books: books.books });
});
