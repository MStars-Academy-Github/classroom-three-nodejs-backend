const http = require("http");
const fs = require("fs");
const jsonFile = `${__dirname}/data/animal.json`;
const foodFile = `${__dirname}/data/foods.json`;
const catFile = `${__dirname}/data/category.json`;
function serveAnimalJson(req, res) {
  res.setHeader("Content-type", "application/json");
  fs.createReadStream(jsonFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);
}
function serveFoodJson(req, res) {
  res.setHeader("Content-type", "application/json");
  fs.createReadStream(foodFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);
}
function serveCatJson(req, res) {
  res.setHeader("Content-type", "application/json");
  fs.createReadStream(catFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);
}
http
  .createServer(function (request, response) {
    if ((request.url === "/") | (request.url === "/animal")) {
      return serveAnimalJson(request, response);
    } else if (request.url === "/api/foods") {
      return serveFoodJson(request, response);
    } else if (request.url === "/api/categories") {
      return serveCatJson(request, response);
    } else {
      response.end("Not Found");
    }
  })
  .listen(3000);
