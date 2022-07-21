const { Router } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const app = express();
const validator = require("express-validator");
const { request } = require("http");
require("dotenv").config();
const PORT = process.env.PORT;

app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");

router.get("/add", (req, res, next) => {
  res.render("addbook");
});
router.post("/add", (req, res, next) => {
  req.on("data", (chunk) => {
    console.log(`Data chunk available: ${chunk}`);
    fs.readFile("./models/book.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log(data);
        const arr = JSON.parse(data);
        const newData = JSON.parse(chunk);
        arr.push(newData);
        fs.writeFile("./models/book.json", JSON.stringify(arr), (err) => {
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
//// Buh nomiin medeelel

app.get("/books", (req, res) => {
  fs.readFile("./models/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error on reading");
    } else {
      const ddata = JSON.parse(data);
      res.send(ddata.books);
    }
  });
});
/// Random 3 nom
app.get("/book", (req, res) => {
  fs.readFile("./models/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error on reading");
    } else {
      const ddata = JSON.parse(data);
      const newData = [
        ddata.books[Math.floor(Math.random() * ddata.books.length)],
        ddata.books[Math.floor(Math.random() * ddata.books.length)],
        ddata.books[Math.floor(Math.random() * ddata.books.length)],
      ];
      res.render("book", { data: newData });
      console.log(...newData);
    }
  });
});
/// Hevlegdsen daraalal

app.get("/book/date", (req, res, next) => {
  let dates = [];
  fs.readFile("./models/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error on reading");
    } else {
      const ddata = JSON.parse(data);
      ddata.books.map((book) => {
        dates.push(`${book.published} ${book.title}\n`);
        dates.sort();
        return dates;
      });
      next(dates);
    }
  });
});
//// Auhort name
app.get("/book/author", (req, res) => {
  fs.readFile("./models/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error on reading");
    } else {
      const ddata = JSON.parse(data);
      const newData = ddata.books;
      res.render("author", { data: newData });
      console.log(...newData);
    }
  });
});
//// Id check
app.get("/book/:id", (req, res, next) => {
  let book;
  const bookName = req.params.id;
  fs.readFile("./models/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error on reading");
    } else {
      const ddata = JSON.parse(data);
      ddata.books.filter((e) => {
        e.isbn = bookName;
        book = e.title;
        return book;
      });
      res.send(book);
    }
  });
});
/// Hamgiin ih huudastai nomin medeelel
app.get("/book/maxpage", (req, res, next) => {
  fs.readFile("./models/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error on reading");
    } else {
      const ddata = JSON.parse(data);
      ddata.books.filter((e) => {
        e.isbn = bookName;
        book = e.title;
        return book;
      });
      res.send(book);
    }
  });
});

app.get("/api/:id", (req, res, next) => {
  let maps = [];
  const bookName = req.params.id;
  //   console.log(bookName);
  fs.readFile("./models/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error on reading");
    } else {
      const ddata = JSON.parse(data);
      ddata.books.map((e) => {
        console.log(e[bookName]);
        maps.push(e[bookName]);
      });
      console.log(maps);
      res.send(maps);
      //   next(ddata);
    }
  });
});

router.get("/", (req, res, next) => {
  res.send("Hey hey");
});
app.use("/", router);

app.listen(PORT, () => {
  console.log("My app is running");
});
