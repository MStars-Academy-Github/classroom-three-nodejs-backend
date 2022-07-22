const express = require("express");
const validator = require("express-validator");
const fs = require("fs");
const moment = require("moment");
const router = express.Router();
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const util = require("util");
const readFile = util.promisify(fs.readFile);
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");
app.use(router);

readFile("./public/book.json", "utf-8", (err, book) => {
  if (err) {
    console.error(err);
  } else {
    books = JSON.parse(book);
  }
});

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

router.get("/", (req, res, next) => {
  res.send("Hey Hey!");
});

// 1. Хэрэглэгч номын систем рүү нэвтрэх бүрт санамсаргүй байдлаар 3 номыг хардаг байна
router.get("/books", (req, res, next) => {
  const filterData = getMultipleRandom(books.books, 3);
  //   console.log(typeof filterData);
  res.render("index", { data: filterData });
});

// 2. Хасгийн сүүлээс эхэн хүртэл хэвлэгдсэн дарааллаар номын мэдээллийг авна.
router.get("/books/sort", (req, res, next) => {
  let sortby = books.books;
  let sorted = sortby.sort((a, b) => {
    return (
      moment(JSON.stringify(b.published), "YYYY") -
      moment(JSON.stringify(a.published), "YYYY")
    );
  });
  //   console.log(typeof sorted);
  res.send(sorted);
});

//3. манай номын сан дахь бүх зохиолчдын нэрийг авмаар байна.
router.get("/books/authors", (req, res) => {
  const authors = [];
  books.books.map((a) => {
    return authors.push(a.author);
  });
  res.send(authors);
});

//5. ISBN дугаараар ноPIн Pэдээлэл буцаах (localhost/book/isbn_id).
router.get("/books/isbn/:id", (req, res) => {
  const isbn = JSON.parse(req.params.id);
  const newBook = [];
  books.books.find((books) => {
    if (books.isbn == isbn) {
      newBook.push(books);
    }
  });
  console.log(newBook);
  res.send(newBook);
});

//4. Бүх номын мэдээллийг авах api.
router.get("/all", (req, res, next) => {
  res.render("allbook", { data: books.books });
});

//6. номын нэрээр хайлт хийх api (localhost/search?title=”js”)
router.get("/books/search/:title", (req, res) => {
  const searchTitle = JSON.stringify(req.params.title);
  console.log(searchTitle);
  const newBook = [];
  books.books.filter((books) => {
    if (
      JSON.stringify(books.title)
        .toLocaleLowerCase()
        .trim()
        .match(searchTitle.toLocaleLowerCase().trim())
    ) {
      newBook.push(books);
    }
  });
  console.log(newBook);
  res.send(newBook);
});
//7. Хамгийн их хуудастай номын мэдээлэл авах.
function maxValue(...args) {
  const max = args.reduce((acc, val) => {
    return acc.pages > val.pages ? acc : val;
  });
  return max;
}
router.get("/maximiumPageNumber", (req, res) => {
  const arr = books.books;
  //   console.log(JSON.stringify(arr));
  const max = maxValue(...arr);
  res.send(max);
});

//7. Хамгийн бага хуудастай номын мэдээлэл авах.
function minValue(...args) {
  const min = args.reduce((acc, val) => {
    return acc.pages < val.pages ? acc : val;
  });
  return min;
}
router.get("/minimiumPageNumber", (req, res) => {
  const arr = books.books;
  const minimium = minValue(...arr);
  //   console.log(newBook);
  res.send(minimium);
});
//9. Хэвлэлийн компаниудыг жагсаан дор бүрнээ хэдэн ном бидэнд нийлүүлсэн талаарх мэдээлэл авах
router.get("/publisher", (req, res) => {
  const publisher = [];

  books.books.map((a) => {
    return publisher.push(a.publisher).join(",").split(",");
  });
  res.send(publisher);
});

router.get("/add", (req, res, next) => {
  res.render("addBook");
});

app.listen(PORT, () => {
  console.log("My app is running");
});
