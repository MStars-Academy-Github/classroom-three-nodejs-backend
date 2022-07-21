const express = require("express");
const fs = require("fs");
const validator = require("express-validator");
const router = express.Router();
const { Router } = require("express");
const { request } = require("http");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

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
        console.error(err);
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
      console.log("error on reading");
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
      console.log("error on reading");
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

app.listen(PORT, () => {
  console.log("My app is running");
});
