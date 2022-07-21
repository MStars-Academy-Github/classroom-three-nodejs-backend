const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const router = express.Router();
const bookJson = require("./data/book.json");
const moment = require("moment");
const { parse } = require("dotenv");
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

  res.render("index", {
    randomBook1: randomBook1,
    author: author,
    publishedDay: publishedDay,
  });
});

app.use(router);
app.listen(PORT, () => {
  console.log("my app");
});

// router.get("/ramBook", (req, res, next) => {
//   let data = bookJson;
//   const ranBook = data.books.map((title) => {
//     return title.title;
//   });
//   function threeBookRandom(arr, num) {
//     const shuffled = [...arr].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, num);
//   }
//   const randomBook1 = threeBookRandom(ranBook, 3);
//   res.send(randomBook1);
// });

/* 
  RAMDOM BOOK ONE
  const data1 = data.books;
  const random = Math.floor(Math.random() * data1.length);
  randomBook = site[random];
  console.log(randomBook);
*/
