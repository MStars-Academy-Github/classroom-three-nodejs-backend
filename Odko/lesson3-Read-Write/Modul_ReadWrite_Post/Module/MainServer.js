var file = require("fs");
var http = require("http");

const animal = `${__dirname}/../jsonData/animal.json`;
const food = `${__dirname}/../jsonData/foods.json`;

/* 
function import hiihdee require gej hicheed 
import hiideg nogoo taldaa export gej function ywuuldag 
*/

const serverFood = require("./food");
const serverAnimal = require("./animal");

http
  .createServer(function (request, response) {
    if (request.url === "/foods") {
      return serverFood(request, response);
    } else if (request.url === "/animal") {
      return serverAnimal(request, response);
    } else {
      response.end("server");
    }
  })
  .listen(3000);
console.log("server running at http://localhost:3000");
