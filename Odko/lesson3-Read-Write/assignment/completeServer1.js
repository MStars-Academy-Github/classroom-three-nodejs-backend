var http = require("http");
const file = require("fs");

const animaljson = `${__dirname}/data/animal.json`;
const foodsjson = `${__dirname}/data/foods.json`;

const animal = require("./serverAnimal");
const food = require("./serverFoods");

http
  .createServer(function (request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Request-Method", "*");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "POST, PUT, GET, OPTIONS"
    );
    response.setHeader("Access-Control-Allow-Headers", "*");

    if (request.url === "/animal") {
      return animal(request, response);
    } else if (request.url === "/foods") {
      return food(request, response);
    } else {
      response.end("SERVER");
    }
  })
  .listen(3000);
console.log("server running at http://localhost:3000");
