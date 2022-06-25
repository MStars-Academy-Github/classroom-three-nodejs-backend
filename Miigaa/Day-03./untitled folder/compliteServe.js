var http = require("http");
const fs = require("fs");

const AudioServerFile = require("./AudioServer")
const VideoServerFile = require("./VideoServer")
const ImageServerFile = require("./ImgServer")
const jsonServerFile = require ("./DataServer")

http
  .createServer((request, response) => {
    console.log(request.url);
    if (request.url === "/json") {
      return jsonServerFile(request, response);
    } else if (request.url === "/image") {
      return ImageServerFile(request, response);
    } else if (request.url === "/audio") {
      return AudioServerFile(request, response);
    } else if (request.url === "/video") {
      return VideoServerFile(request, response);
    } else {
      response.end("Not Found");
    }
  })
  .listen(3000);



