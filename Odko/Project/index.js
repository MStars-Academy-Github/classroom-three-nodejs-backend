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

/*_______________________ DASGARL-1______________________________*/

router.get("/", (req, res, next) => {
  let data = bookJson;

  const ranBook = data.books.map((title) => {
    return title.title;
  });
  function threeBookRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
  const randomBook1 = threeBookRandom(ranBook, 3);
  res.render("index", {
    randomBook1: randomBook1,
  });
});

/*_______________________ DASGARL-2______________________________*/

router.get("/published", (req, res, next) => {
  let data = bookJson;
  const published = data.books.map((published) => {
    return new Date(moment(published.published).format(`YYYY/MM/DD`));
  });
  const sort = published.sort((a, b) => {
    return a - b;
  });
  const publishedDay = sort.map((date) => {
    return moment(date).format(`YYYY/MM/DD`);
  });
  res.render("publishedDay", {
    publishedDay: publishedDay,
  });
});

/*_______________________ DASGARL-3______________________________*/

router.get("/author", (req, res, next) => {
  let data = bookJson;
  const author = data.books.map((title) => {
    return title.author;
  });
  res.render("author", {
    author: author,
  });
});

/*_______________________ DASGARL-4______________________________*/

router.get("/allBook", (req, res, next) => {
  let allBook = bookJson;
  let Books = bookJson.books;

  const ranBook = allBook.books.map((title) => {
    return title.title;
  });
  function threeBookRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
  const randomBook1 = threeBookRandom(ranBook, 3);

  res.render("allBook", {
    allBook: allBook,
    Books: Books,
    randomBook1: randomBook1,
  });
});

/*_______________________ DASGARL-5______________________________*/

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
  /*_______________________ DASGARL-7______________________________*/

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
    console.log(max);
    /*_______________________ DASGARL-8______________________________*/
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
    /*_______________________ DASGARL-9______________________________*/
  } else if (req.params.name === "publisher") {
    // let data = bookJson;
    // let mf = 1;
    // let m = 0;
    // let item;
    // for (let i = 0; i < data.books.length; i++) {
    //   for (let j = i; j < data.books.length; j++) {
    //     if (data.books[i] == data.books[j]) {
    //       m++;
    //       if (m > mf) {
    //         mf = m;
    //         item = arr[i];
    //       }
    //     }
    //   }
    //   m = 0;
    // }
    // console.log(mf);
    // console.log(m);
    // console.log(item);
  }
  res.send("hi");
});

/* ADD BOOK EJS */
/*_______________________ BOOK ADD______________________________*/

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
      // readData.books.map((a) => {
      //   if (parseInt(a.isbn) !== parseInt(dataa.isbn)) {
      //     return data.push(dataa);
      //   }
      // });
      readData.books.push(dataa);
      fs.writeFile("./data/book.json", JSON.stringify(readData), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
          // console.log(readData.books);
        }
      });
    }
  });
  data.push(dataa);
  res.render("form", { dataa: dataa, data: data });
});

app.use(router);
app.listen(3001, () => {
  console.log("my app hi");
});

/* 
  RAMDOM BOOK ONE
  const data1 = data.books;
  const random = Math.floor(Math.random() * data1.length);
  randomBook = site[random];
  console.log(randomBook);
*/
