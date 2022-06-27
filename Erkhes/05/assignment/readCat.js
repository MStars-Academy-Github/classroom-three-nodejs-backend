const http = require("http");
const fs = require("fs");
const read = require("../module/read.js");

http
  .createServer((request, response) => {
    if (request.method === "GET") {
      if (request.url === "/api/categories") {
        return read(request, response);
      } else {
        response.end("Not Found");
      }
    }
  })
  .listen(3000);
