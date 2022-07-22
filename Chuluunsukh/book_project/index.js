const express = require("express");
const fs = require("fs");
const validator = require("express-validator");
const router = express.Router();
const { Router } = require("express");
const { request } = require("http");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const util = require("util");
const readFile = util.promisify(fs.readFile);
let books = [{}];
readFile("./public/book.json", "utf-8", (err, bookData) => {
  if (err) {
    console.log(err);
  } else {
    books = JSON.parse(bookData);
  }
});

app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");

app.use(router);

router.get("/", (req, res, next) => {
  res.send("Hey Hey!");
});

router.get("/add", (req, res, next) => {
  res.render("addBook");
});
router.post("/add", (req, res, next) => {
  req.on("data", (chunk) => {
    console.log(`Data chunk available: ${chunk}`);
    fs.readFile("./public/book.json", "utf-8", (err, data) => {
      if (err) {
        console.error("So sad, Error has occured to loading this page");
        return;
      } else {
        console.log(data);
        const arr = JSON.parse(data);
        const newData = JSON.parse(chunk);
        arr.push(newData);
        fs.writeFile("./public/book.json", JSON.stringify(arr), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("success");
          }
        });
      }
    });
  });
  res.send("api");
});

// reading book file section

app.get("/books", (req, res) => {
  fs.readFile("./public/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("So sad, Error has occured to loading this page");
    } else {
      const ddata = JSON.parse(data);
      res.send(ddata.books);
    }
  });
});

// selecting 3 books randomly

app.get("/book", (req, res) => {
  fs.readFile("./public/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("So sad, Error has occured to loading this page");
    } else {
      const ddata = JSON.parse(data);
      const newData = [
        ddata.books[Math.floor(Math.random() * ddata.books.length)],
        ddata.books[Math.floor(Math.random() * ddata.books.length)],
        ddata.books[Math.floor(Math.random() * ddata.books.length)],
      ];
      res.render("index", { data: newData });
      console.log(...newData);
    }
  });
});

// Publisher section

router.get("/publisher", (req, res, next) => {
  fs.readFile("./book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("So sad, Error has occured to loading this page");
    } else {
      let count = {};
      const publishers = [];
      const ddata = JSON.parse(data);
      ddata.books.map((e) => {
        publishers.push(e.publisher);
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
    }
  });
});

// Search section

router.get("/search", (req, res, next) => {
  const url = req.query.title;
  fs.readFile("./book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("So sad, Error has occured to loading this page");
    } else {
      const result = [];
      const ddata = JSON.parse(data.toLowerCase());
      ddata.books.map((e) => {
        if (e.title.match(url)) {
          result.push(e);
        }

        return;
      });
      res.send(result);
    }
  });
});

// Author section

router.get("/authors", (req, res) => {
  let authors = [];
  books.books.map((book) => {
    return authors.push(book.author);
  });
  res.send(authors);
});

// Id section

router.get("/isbn/:id", (req, res, next) => {
  let book;
  const isbn = req.params.id;
  console.log(isbn);
  fs.readFile("/public/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("So sad, Error has occured to loading this page");
    } else {
      const ddata = JSON.parse(data);
      ddata.books.filter((e) => {
        e.isbn === isbn;
        book = e;
        return book;
      });
      res.send(book);
    }
  });
});

// Api running section

router.get("/api/:id", (req, res, next) => {
  let maps = [];
  const bookName = req.params.id;
  fs.readFile("/public/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("So sad, Error has occured to loading this page");
    } else {
      const Data = JSON.parse(data);
      Data.books.map((e) => {
        console.log(e[bookName]);
        maps.push(e[bookName]);
      });
      console.log(maps);
      res.send(maps);
    }
  });
});

// Date section

router.get("/dates", (req, res, next) => {
  let dates = [];
  fs.readFile("./public/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("So sad, Error has occured to loading this page");
    } else {
      const Data = JSON.parse(data);
      Data.books.map((book) => {
        dates.push(`${book.published} ${book.title}\n`);
        dates.sort();
        return dates;
      });
      next(dates);
    }
  });
});

// Min, max section

router.get("/max", (req, res, next) => {
  fs.readFile("./public/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("So sad, Error has occured to loading this page");
    } else {
      let pages = [];
      let max;
      const Data = JSON.parse(data);
      Data.books.map((e) => {
        pages.push(e.pages);
        pages.sort();
      });
      console.log(pages[pages.length - 1]);
      Data.books.map((e) => {
        if (e.pages == pages[pages.length - 1]) {
          max = e;
        }
        return;
      });
      res.send(max);
    }
  });
});
router.get("/min", (req, res, next) => {
  fs.readFile("./public/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("So sad, Error has occured to loading this page");
    } else {
      let pages = [];
      let min;
      const Data = JSON.parse(data);
      Data.books.map((e) => {
        pages.push(e.pages);
        pages.sort();
      });
      Data.books.map((e) => {
        if (e.pages == pages[0]) {
          min = e;
        }
        return;
      });
      res.send(min);
    }
  });
});

// Port listening section

app.listen(PORT, () => {
  console.log("Woohoo, My app is running around!");
});
