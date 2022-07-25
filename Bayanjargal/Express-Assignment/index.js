const express = require("express");
const validator = require("express-validator");
const books = require("./public/book.json");
const moment = require("moment");
require("dotenv").config();
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
const fs = require("fs");
app.listen(PORT, () => {
  console.log("App is running");
});
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router.get("/", (req, res, next) => {
  const randomThree = (arr, num) => {
    const shuffle = [...arr].sort(() => 0.5 - Math.random());
    return shuffle.slice(0, num);
  };
  const databookConvert = books.books;
  const dataBookThree = randomThree(databookConvert, 3);
  res.render("index", { data: dataBookThree });
});
router.get("/add", (req, res, next) => {
  res.render("Addbook");
});
router.post("/add", (req, res, next) => {
  fs.readFile("./public/book.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const arr = JSON.parse(data);
      const book = req.body;
      arr.books.push(book);
      fs.writeFile("./public/book.json", JSON.stringify(arr), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
    }
  });
  res.end("amjilttai nemegdlee");
});
app.use(express.static("public"));
router.get("/home/:name", (req, res, next) => {
  const requistURl = req.params.name;
  if (requistURl == "date") {
    const dateSort = books.books;
    dateSort.sort((a, b) => {
      let dateC = new Date(a.published) - new Date(b.published);
      return dateC;
    });
    res.render("date", { data: dateSort });
  } else if (requistURl == "author") {
    let data = {
      author: books,
    };
    res.render("author", { data: data });
  } else if (requistURl == "infobook") {
    res.send(books.books);
  } else if (requistURl == "maxpage") {
    const filteMax = books.books;
    let max = Math.max(...filteMax.map((m) => m.pages));
    const filteredMax = filteMax.filter((book) => book.pages == max);
    res.send(filteredMax);
  } else if (requistURl == "minpage") {
    const filterMin = books.books;
    let min = Math.min(...filterMin.map((m) => m.pages));
    const filteredMin = filterMin.filter((book) => book.pages == min);
    res.send(filteredMin);
  } else if (requistURl == "publisher") {
    const noStarchPressBooks = books.books.filter(
      (book) => book.publisher == "No Starch Press"
    ).length;
    const oReillyMedia = books.books.filter(
      (book) => book.publisher == "O'Reilly Media"
    ).length;
    const apress = books.books.filter((book) =>
      book.publisher.includes("Apress")
    ).length;
    const Independently = books.books.filter(
      (book) => book.publisher == "Independently published"
    ).length;
    res.send(
      `No Starch Press : ${noStarchPressBooks} ,O'Reilly Media :${oReillyMedia} , Apress:${apress} , Independently published:${Independently}`
    );
  }
});
router.get("/search/:title", (req, res, next) => {
  const title = req.params.title.toLocaleLowerCase();
  console.log(title);
  const searchItem = books.books.filter((book) =>
    book.title.toLocaleLowerCase().includes(title)
  );
  console.log(searchItem);
  res.send(searchItem);
});
router.get("/book/:isbn_id", (req, res, next) => {
  const isbn_id = req.params.isbn_id;
  const filteredBook = books.books.filter((id) => id.isbn === isbn_id);
  res.send(filteredBook);
});

app.use("/api", router);
