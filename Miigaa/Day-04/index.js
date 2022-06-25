var http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");
const serveFile = require("./serveFile");

const AnimalFile = `${__dirname}/data/animal.json`;

http
  .createServer((request, response) => {
    if (request.url === "/") {
      response.end("Hello");
    } else if (request.url === "/json") {
      fs.createReadStream(AnimalFile)
        .on("error", () => {
          console.log("error");
        })
        .pipe(response);
    } else if (request.url.match(/^\/static/)) {
      console.log(request.url);
      response.end("Static");
    } else if (request.url.match(/^\/foods/)) {
      console.log(
        querystring.parse(request.url.split("/", "?").slice(1).join(" "))
      );
      response.end("foods");
    } else if (request.url.match(/^\/categories/)) {
      const parsedURL = url.parse(request.url, true);
      console.log(parsedURL);
      response.end("categories");
    } else if (request.url.match(/^\/public/)) {
      return serveFile(request, response);
    } else {
      response.end("Not Found");
    }
  })
  .listen(3000);
