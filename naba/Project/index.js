const express = require("express");
const router = express.Router();
const validator = require("express-validator");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");
app.use(router);

router.get("/books", (req, res, next) => {
  const data = fs.readFileSync("/public/book.json", "utf");
  const dataSorData = data.books.map((book) => {
    return moment().format(JSON.parse(book, published));
  });
});

router.get("/", (req, res, next) => {
  res.send("hey ");
});

router.get("/add", (req, res, next) => {
  res.render("addBook");
});

console.log(dataSorDat);
res.render("index", { data: JSON.parse(data) });

app.listen(PORT, () => {
  console.log("my app is rinnig");
});
