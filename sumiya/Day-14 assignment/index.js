const express = require("express");
const validator = require("express-validator");
const fs = require("fs");
const moment = require("moment");

const router = express.Router();
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

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

router.get("/books", (req, res, next) => {
  const data = fs.readFileSync("./public/book.json", "utf-8");
  const jsonData = JSON.parse(data);
  const filterData = getMultipleRandom(jsonData.books, 3);
  console.log(typeof filterData);
  //   const dateSortData = data.books.map((book) => {
  //     return moment().format(JSON.parse(book.published), "YYYY");
  //   });
  //   console.log(dateSortData);
  //   const filterData = data.books.sort((date1, date2) => {
  //     return date1.published - date2.published;
  //   });
  //   console.log(filterData);
  //   console.log(typeof data);
  res.render("index", { data: filterData });
});

router.get("/add", (req, res, next) => {
  res.render("addBook");
});

app.listen(PORT, () => {
  console.log("My app is running");
});
