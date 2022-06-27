const fs = require("fs");
const http = require("http");
const querystring = require("querystring");
const url = require("url");
const serveFile = require("./serveFile");
const PORT = 3004;

/// localhost:3000/json => request deer test.json file-iig unshaad
/// stream-eer butsaah

/// localhost:3000 => request 'Hello" gedeg text butsaadag

/// busad PATH deer NOT FOUND gedeg message butsaah

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
      console.log(request.url.slice(8));
      /// hervee /static/12312312 console.log deer 1212312312
      /// hervee /static?name=34 gej orj irvel console.log deer name=34 gej hevlene
      response.end("Static");
    } else if (request.url.match(/^\/foods/)) {
      console.log(querystring.parse(request.url.split("/").slice(1).join(" ")));
      response.end("foods");
    } else if (request.url.match(/^\/categories/)) {
      const parsedURL = url.parse(request.url, true);
      console.log(parsedURL);
      response.end("categories");
    } else if (request.url.match(/^\/public/)) {
      console.log("public router is called");
      return serveFile(request, response);
    } else {
      response.end("Not Found");
    }
  })
  .listen(PORT);
console.log(`Application is running on ${PORT}`);
