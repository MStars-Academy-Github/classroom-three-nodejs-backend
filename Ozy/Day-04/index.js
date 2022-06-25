const fs = require("fs");
const http = require("http");
const JsonFile = `${__dirname}/data/test.json`;
const querystring = require("querystring");
const url = require("url");
const serveFile = require("./serveFile");

http
  .createServer((request, response) => {
    if (request.url === "/json") {
      fs.createReadStream(JsonFile)
        .on("error", () => {
          console.error("err");
        })
        .pipe(response);
    } else if (request.url === "/") {
      response.end("Hello!!!");
    } else if (request.url.match(/^\/static/)) {
      console.log(request.url.slice(8));
      response.end("static");
    } else if (request.url.match(/^\/foods/)) {
      console.log(querystring.parse(request.url.split("/").slice(1).join(" ")));
      response.end("foods");
    } else if (request.url.match(/^\/categories/)) {
      const parseURL = url.parse(request.url, true);
      console.log(parseURL);
      response.end("categories");
    } else if (request.url.match(/^\/public/)) {
      console.log("Running");
      return serveFile(request, response);
    } else {
      response.end("not found");
    }
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");
