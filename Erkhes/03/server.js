const http = require("http");
const fs = require("fs");

const animal = require("./module/animal.js");
const food = require("./module/food.js");
const category = require("./module/category.js");

http
  .createServer(function (request, response) {
    if ((request.url === "/") | (request.url === "/animal")) {
      return animal(request, response);
    } else if (request.url === "/api/foods") {
      return food(request, response);
    } else if (request.url === "/api/categories") {
      return category(request, response);
    } else {
      response.end("Not Found");
    }
  })
  .listen(3000);
