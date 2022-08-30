const express = require("express");
const valid = require("express-validator");
const fs = require("fs");
const router = express.Router();
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { body, validationResult } = require("express-validator");

router.get("/books", (req, res, next) => {
  fs.readFile(
    "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/14-express-router/public/book.json",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("err");
      } else {
        const ddata = JSON.parse(data);
        res.send([
          ddata.books[Math.floor(Math.random() * ddata.books.length)],
          ddata.books[Math.floor(Math.random() * ddata.books.length)],
          ddata.books[Math.floor(Math.random() * ddata.books.length)],
        ]);
      }
    }
  );
});

router.get("/isbn/:id", (req, res, next) => {
  let book;
  const isbn = req.params.id;
  console.log(isbn);
  fs.readFile(
    "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/14-express-router/public/book.json",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("err");
      } else {
        const ddata = JSON.parse(data);
        ddata.books.filter((e) => {
          e.isbn === isbn;
          book = e;
          return book;
        });
        res.send(book);
      }
    }
  );
});
router.get("/api/:id", (req, res, next) => {
  let maps = [];
  const bookName = req.params.id;
  fs.readFile(
    "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/14-express-router/public/book.json",
    "utf-8",
    (err, data) => {
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
      }
    }
  );
});
router.get("/dates", (req, res, next) => {
  let dates = [];
  fs.readFile(
    "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/14-express-router/public/book.json",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("err");
      } else {
        const ddata = JSON.parse(data);
        ddata.books.map((book) => {
          dates.push(`${book.published} ${book.title}\n`);
          dates.sort();
          return dates;
        });
        next(dates);
      }
    }
  );
});
router.get("/max", (req, res, next) => {
  fs.readFile(
    "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/14-express-router/public/book.json",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("err");
      } else {
        let pages = [];
        let max;
        const ddata = JSON.parse(data);
        ddata.books.map((e) => {
          pages.push(e.pages);
          pages.sort();
        });
        console.log(pages[pages.length - 1]);
        ddata.books.map((e) => {
          if (e.pages == pages[pages.length - 1]) {
            max = e;
          }
          return;
        });
        res.send(max);
      }
    }
  );
});
router.get("/min", (req, res, next) => {
  fs.readFile(
    "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/14-express-router/public/book.json",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("err");
      } else {
        let pages = [];
        let min;
        const ddata = JSON.parse(data);
        ddata.books.map((e) => {
          pages.push(e.pages);
          pages.sort();
        });
        ddata.books.map((e) => {
          if (e.pages == pages[0]) {
            min = e;
          }
          return;
        });
        res.send(min);
      }
    }
  );
});
router.get("/publisher", (req, res, next) => {
  fs.readFile(
    "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/14-express-router/public/book.json",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("err");
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
    }
  );
});
router.get("/search", (req, res, next) => {
  const url = req.query.title;
  fs.readFile(
    "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/14-express-router/public/book.json",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("err");
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
    }
  );
  //   res.send("test");
});
router.get("/", (req, res, next) => {
  fs.readFile(
    "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/14-express-router/public/book.json",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("err");
      } else {
        const ddata = JSON.parse(data);
        console.log(ddata);
        // res.send(ddata);
        ddata && res.render("index", { data: ddata.books });
      }
    }
  );
});
const userValid = () => {
  return [
    body("ISBN").isLength({ min: 10, max: 13 }),
    body("title").isString().matches(/(\w)/).withMessage("name must be letters"),
    body("pages").isInt(),
    body("name").isString().matches(/(\w)/).withMessage("name must be letters"),
    body('published').matches(/\^(0[1-9]|1[012])[- /.] (0[1-9]|[12][0-9]|3[01])[- /.] (19|20)\d\d$./)
  ];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }
  const extractedErrors = [];
  errors
    .array()
    .forEach((err) => extractedErrors.push({ [err.param]: err.msg }));
  //   console.log(errors);
  if (errors.length !== 0) {
    return res.status(400).json({
      errors: extractedErrors,
    });
  }
};
router.get("/add", (req, res, next) => {
  res.render("addBooks");
});
router.post("/add/book", userValid()  , (req, res) => {
  console.log(req.body.title);
  res.send(req.body);
});
// router.get('/delete' , (req ,res ,next)=>{
//   const url = req.query.isbn;
//   let result = []
//   function filtering (e){
//     return e.isbn != url
//   }
//   fs.readFile(
//     "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/14-express-router/public/book.json",
//     "utf-8",
//     (err, data) => {
//       if (err) {
//         console.log("err");
//       } else {
//         const ddata = JSON.parse(data);
//         ddata.books.forEach(e=>{
//           if(e.isbn != url){
//             result.push(e)
//           }
//           // if(result.length === 0){
//           //   result = ddata
//           //   console.log('there is no book with this isbn');
//           // }
//         })
//         console.log(result);
//         fs.writeFile(
//           "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/14-express-router/public/book.json",
//           JSON.stringify(result),
//           (err) => {
//             if (err) {
//               console.error(err);
//             } else {
//               console.log("success");
//             }
//           }
//         );
//       }
//     }
//   );
//   res.end('test')
// })
app.use(router);
app.listen(PORT);
