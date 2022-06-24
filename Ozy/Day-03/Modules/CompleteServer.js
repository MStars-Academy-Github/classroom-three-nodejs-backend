const http = require("http");
const serverAudioFile = require("./audio");
const serverImageFile = require("./image");
const serverVideoFile = require("./video");
const serverJsonFile = require("./json");

http
  .createServer(function (request, response) {
    if (request.url === "/json") {
      return serverJsonFile(request, response);
    }
    if (request.url === "/video") {
      return serverVideoFile(request, response);
    }
    if (request.url === "/audio") {
      return serverAudioFile(request, response);
    }
    if (request.url === "/image") {
      return serverImageFile(request, response);
    } else response.end("not found");
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");
