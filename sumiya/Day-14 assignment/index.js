const { count } = require("console");
const express = require("express");
const { body } = require("express-validator");
const validator = require("express-validator");
const fs = require("fs");
const moment = require("moment");
const router = express.Router();
const app = express();
const PORT = process.env.PORT;
const util = require("util");
const readFile = util.promisify(fs.readFile);
const { validationResult } = require("express-validator");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(router);
app.use(bodyParser.json());
require("dotenv").config();
let books;
readFile("./public/book.json", "utf-8", (err, Data) => {
  if (err) {
    console.error(err);
  } else {
    books = JSON.parse(Data);
  }
});

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

router.get("/", (req, res, next) => {
  res.send("Hey Hey!");
});
//-----------------------------------------------------------------------------------------
// 1. Хэрэглэгч номын систем рүү нэвтрэх бүрт санамсаргүй байдлаар 3 номыг хардаг байна
router.get("/books", (req, res, next) => {
  const filterData = getMultipleRandom(books.books, 3);
  //   console.log(typeof filterData);
  res.render("index", { data: filterData });
});
//-----------------------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------------------
//3. манай номын сан дахь бүх зохиолчдын нэрийг авмаар байна.
router.get("/books/authors", (req, res) => {
  const authors = [];
  books.books.map((a) => {
    return authors.push(a.author);
  });
  res.send(authors);
});
//-----------------------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------------------
//4. Бүх номын мэдээллийг авах api.
router.get("/allbooks", (req, res, next) => {
  res.render("allbook", { data: books.books });
});
//-----------------------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------------------
//7. Хамгийн их хуудастай номын мэдээлэл авах.
function maxValue(...args) {
  const max = args.reduce((acc, val) => {
    return acc.pages > val.pages ? acc : val;
  });
  return max;
}
router.get("/maximiumPageNumber", (req, res) => {
  let arr = books.books;
  const max = maxValue(...arr);
  res.send(max);
});
//-----------------------------------------------------------------------------------------
//7. Хамгийн бага хуудастай номын мэдээлэл авах.
function minValue(...args) {
  const min = args.reduce((acc, val) => {
    return acc.pages < val.pages ? acc : val;
  });
  return min;
}
router.get("/minimiumPageNumber", (req, res) => {
  const arr = books.books;
  console.log(typeof arr);
  const minimium = minValue(...arr);
  res.send(minimium);
});
//-----------------------------------------------------------------------------------------
//9. Хэвлэлийн компаниудыг жагсаан дор бүрнээ хэдэн ном бидэнд нийлүүлсэн талаарх мэдээлэл авах
router.get("/publisher", (req, res) => {
  const publisher = [];
  const count = {};
  books.books.map((a) => {
    return publisher.push(a.publisher);
  });
  for (let i = 0; i <= publisher.length; i++) {
    let counted = publisher[i];
    console.log(counted);
    if (count[counted] == null) {
      count[counted] = 1;
    } else {
      count[counted]++;
    }
  }
  res.send(count);
}); 
//-----------------------validation-------------------------------------
const userValidationRules = () => {
  return [
    body("isbn","invalid numbers").isLength({ min: 10, max: 13 }).notEmpty(),
    body("title","invalid letters").isString().notEmpty(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(400).json({ errors: extractedErrors });
  
};
//--------------------------server side use ejs---------------------------------------------------------------
//1. ejs ашигланa a. Шинэ ном нэмэх форм
router.get("/addbook", (req, res, next) => {
  res.render("addBook");
});
router.post("/addbook", userValidationRules(), validate, (req, res, next) => {

  readFile("./public/book.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let book = JSON.parse(data);
      let newData = req.body;
      book.books.push(newData);
      console.log(newData);
      fs.writeFile("./public/book.json", JSON.stringify(book), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
    }
  });
  res.end("success");
});

//--------------------------server side use ejs---------------------------------------------------------------
//2. isbn id- гаар хайж олоод устгахад бэлэн болгоод амжилттай хариу буцаахад болно.

router.post("/deletebook/:isbn", (req, res, next) => {
  let reqst = req.params.isbn;
  let indexOfOdject = books.books.filter((obj) => {
    return obj.isbn != reqst;
  });
  res.render("deletebook", { books: indexOfOdject });
 

});
app.listen(PORT || 3000, () => {
  console.log("app is running");
});
