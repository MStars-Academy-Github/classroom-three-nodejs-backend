const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const router = express.Router();
const bookJson = require("./data/book.json");
const moment = require("moment");

/*
EJS HTML
*/
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });

router.get("/", (req, res, next) => {
  res.send("hey");
});

router.get("/add", (req, res, next) => {
  res.render("addBook");
});

/* EJS */
router.get("/book", (req, res, next) => {
  let data = bookJson;
  // DASGARL-1
  const ranBook = data.books.map((title) => {
    return title.title;
  });
  function threeBookRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
  const randomBook1 = threeBookRandom(ranBook, 3);

  // DASGAL-2
  const published = data.books.map((published) => {
    return new Date(moment(published.published).format(`YYYY/MM/DD`));
  });
  const sort = published.sort((a, b) => {
    return a - b;
  });
  const publishedDay = sort.map((date) => {
    return moment(date).format(`YYYY/MM/DD`);
  });

  // DASGAL-3
  const author = data.books.map((title) => {
    return title.author;
  });

  // DASGAL-4
  const allBook = bookJson;
  res.render("index", {
    randomBook1: randomBook1,
    author: author,
    publishedDay: publishedDay,
    allBook: allBook,
  });
});

/*  
    EJS ashigaagui 
    DASGAL-5
*/
app.use(express.json());
router.post("/book/:name", (req, res, next) => {
  if ((req.params.name = "isbn_id")) {
    // console.log(req.body.isbn);
    let data = bookJson;
    const dd = data.books.map((a) => {
      if (a.isbn === req.body.isbn) {
        return a;
      }
    });
    // console.log(dd);
    // DASGAL-6
  } else if (req.params.name == "aa") {
    console.log(req.params.name);
  }
  res.send("hi");
});

app.use(router);
app.listen(PORT, () => {
  console.log("my app");
});

/* 
  RAMDOM BOOK ONE
  const data1 = data.books;
  const random = Math.floor(Math.random() * data1.length);
  randomBook = site[random];
  console.log(randomBook);
*/
