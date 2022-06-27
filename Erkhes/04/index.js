const fs = require("fs");
const http = require("http");
const serveJson = require("./jsonModule");
const querystring = require("querystring");
const url = require("url");
const serveFile = require("./serveFile");

http
  .createServer((request, response) => {
    if (request.url === "/json") {
      fs.createReadStream("./data/data.json")
        .on("error", () => {
          console.log("error");
        })
        .pipe(response);
    } else if (request.url === "/") {
      response.end("<h1>Hello </h1>");
    } else if (request.url.match(/^\/static/)) {
      const behind = request.url.slice(8);
      console.log(behind);
      response.end("Static");
    } else if (request.url.match(/^\/foods/)) {
      const query = querystring.parse(
        request.url.split("?").slice(1).join(" ")
      );
      console.log(query);
      response.end("foods");
    } else if (request.url.match(/^\/categories/)) {
      const parseUrl = url.parse(request.url, true);
      console.log(parseUrl);
      response.end("categories");
    } else if (request.url.match(/^\/public/)) {
      return serveFile(request, response);
    } else {
      response.end("Not Found");
    }
  })
  .listen(3001);
