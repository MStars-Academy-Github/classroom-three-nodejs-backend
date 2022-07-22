const express = require("express");
const validator = require("express-validator");
const books = require("./public/book.json");
const moment = require("moment")
require("dotenv").config();
const router = express.Router();
const app = express();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("App is running");
});
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });
app.set("view engine", "ejs");
router.get("/", (req, res, next) => {
    const randomThree = (arr, num) => {
      const shuffle = [...arr].sort(() => 0.5 - Math.random());
      return shuffle.slice(0, num);
    };
    const databookConvert = books.books;
    const dataBookThree = randomThree(databookConvert, 3);
    res.render("index", { data: dataBookThree });
});
router.get("/add", (req, res, next) => {
  res.render("Addbook");
});
router.get("/home/:name", (req, res, next) => {
    const requistURl  = req.params.name
  if(requistURl == "date"){
    const dateSort = books.books;
    dateSort.sort((a , b)=>{

       
       let dateC = new Date(a.published) - new Date(b.published)
       
       return dateC
    })
    res.render("date" , {data:dateSort})
  }else if(requistURl == "author"){
    let data = {
    author:books
    }
    res.render("author", {data:data})
  
  }else if (requistURl == "infobook"){
   res.send(books.books)
  }else if(requistURl =="maxpage"){
   const filteMax= books.books
   let max=Math.max(...filteMax.map(m=>m.pages))
   const a= filteMax.filter(book=>book.pages == max)
   res.send( a)
  }else if(requistURl == "minpage"){
   const filterMin = books.books
   let min=Math.min(...filterMin.map(m=>m.pages))
   const b = filterMin.filter(book=>book.pages==min)
   res.send(b)
  }
});
router.get("/search/:title" , (req ,res , next)=>{
    const title = 
    console.log(req.params.title)
})
app.use(router);
