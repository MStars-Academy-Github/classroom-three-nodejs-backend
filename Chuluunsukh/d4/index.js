const fs = require("fs");
const http = require("http");
const querystring = require("querystring");
const url = require("url");
const servingFile = require("./serveFile");
const information = `${__dirname}/data/test.json`;
console.log();

http
  .createServer(function (request, response) {
    if (request.url === "/json") {
      fs.createReadStream(information)
        .on("error", () => {
          console.log("error");
        })
        .pipe(response);
    } else if (request.url === "/") {
      response.write("<h1>Hello!</h1>\n");
      response.end();
    } else if (request.url.match(/^\/static/)) {
      console.log(request.url.slice(8));
      response.end("static");
    } else if (request.url.match(/^\/foods/)) {
      console.log(querystring.parse(request.url.split("/").slice(1).join(" ")));
      response.end("Foods");
    } else if (request.url.match(/^\/categories/)) {
      const parsedURL = url.parse(request.url, true);
      console.log(parsedURL);
      response.end("categories");
    } else if (request.url.match(/^\/public/)) {
      return servingFile(request, response);
    } else {
      response.end("Not Found");
    }
  })
  .listen(3000);
console.log('Server running at http://localhost"3000');
