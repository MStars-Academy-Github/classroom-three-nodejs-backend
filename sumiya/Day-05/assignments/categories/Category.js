// const addCategories = require("./postCat");
const getCategories = require("./getCat");
const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.url === "/api/categories") {
      // return addCategories(req, res);
    } else if (req.url === "/categories") {
      return getCategories(req, res);
    } else {
      console.log("Not Found");
    }
  })
  .listen(3000);

console.log("Server running at http://localhost:3000");
