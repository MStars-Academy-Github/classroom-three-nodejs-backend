const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const router = express.Router();
const bookJson = require("./data/book.json");
const moment = require("moment");
var parseUrl = require("body-parser");
const fs = require("fs");

/*
EJS HTML
*/

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });

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
router.get("/book/:isbn_id", (req, res, next) => {
  console.log(req.method);
  // if ((req.params.name = "isbn_id")) {
  //   console.log(req.params.name);
  //   let data = bookJson;
  //   console.log(data);
  // }

  res.send("hi");
});

router.get("/book1/:name", (req, res, next) => {
  /* DASGAL-7  MAX pages */
  if (req.params.name === "max") {
    let data = bookJson;
    const element = data.books.map((a) => {
      return a.pages;
    });
    const element1 = Math.max(...element);
    const max = data.books.filter((a) => {
      if (a.pages >= element1) {
        return a;
      }
    });
    // console.log(max);
    /* DASGAL-8 MIN pages */
  } else if (req.params.name === "min") {
    let data = bookJson;
    const element = data.books.map((a) => {
      return a.pages;
    });
    const element1 = Math.min(...element);
    const min = data.books.filter((a) => {
      if (a.pages <= element1) {
        return a;
      }
    });

    // console.log(min);
    /* DASGAL-9  */
  } else if (req.params.name === "publisher") {
    let data = bookJson;
    let mf = 1;
    let m = 0;
    let item;
    for (let i = 0; i < data.books.length; i++) {
      for (let j = i; j < data.books.length; j++) {
        if (data.books[i] == data.books[j]) {
          m++;
          if (m > mf) {
            mf = m;
            item = arr[i];
          }
        }
      }
      m = 0;
    }
    console.log(mf);
    console.log(m);
    console.log(item);
  }
  res.send("hi");
});

/* ADD BOOK EJS */
router.get("/addBook", (req, res, next) => {
  let data1 = bookJson.books;
  res.render("addBook", { data1: data1 });
});

let encodeUrl = parseUrl.urlencoded({ extended: false });
router.post("/form", encodeUrl, (req, res, next) => {
  let data = bookJson.books;
  const dataa = req.body;

  fs.readFile("./data/book.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const readData = JSON.parse(data);
      readData.books.push(dataa);
      fs.writeFile("./data/book.json", JSON.stringify(readData), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
    }
  });

  data.push(dataa);

  res.render("form", { dataa: dataa, data: data });
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
