const fs = require("fs");
const http = require("http");
const querystring = require("querystring");
const serveFile = require("./serverFile");
const url = require("url");
http
  .createServer((request, response) => {
    if (request.url === "/json") {
      fs.createReadStream("./data/test.json")
        .on("error", () => {
          console.log("error");
        })
        .pipe(response);
    } else if (request.url === "/") {
      response.end("Hello");
    } else if (request.url.match(/^\/static/)) {
      console.log(request.url);
      response.end("Static");
    } else if (request.url.match(/^\/foods/)) {
      console.log(querystring.parse(request.url.split("?").slice(1).join("")));
      response.end("foods");
    } else if (request.url.match(/^\/categories/)) {
      const parseUrl = url.parse(request.url, true);
      console.log(parseUrl);
      response.end("categories");
    } else if (request.url.match(/^\/public/)) {
      console.log("public router is called");
      return serveFile(request, response);
    } else {
      response.end("static");
    }
  })
  .listen(3006);
