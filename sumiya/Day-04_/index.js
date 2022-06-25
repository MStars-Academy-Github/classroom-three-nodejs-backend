const fs = require("fs");
const http = require("http");
const querystring = require("querystring");
const port = 3000;
const url = require("url");
const serveFile = require("./serveFile");

const test = `${__dirname}/data/test.json`;

http
  .createServer((req, res) => {
    if (req.url === "/json") {
      return serverJsonFile(req, res);
    } else if (req.url === "/") {
      return server(req, res);
    } else if (req.url.match(/^\/static/)) {
      const back = req.url.slice(7, 20);
      res.end(back);
      console.log(back);
    } else if (req.url.match(/^\/foods/)) {
      const a = querystring.parse(req.url.split("?").slice(1).join(" "));
      console.log(a);
      res.end("foods");
    } else if (req.url.match(/^\/categories/)) {
      const parsedURL = url.parse(req.url, true);
      console.log(parsedURL);
      res.end("categories");
    } else if (req.url.match(/^\/public/)) {
      console.log("public router is called");
      return serveFile(req, res);
    } else {
      res.end("Not Found");
    }
  })
  .listen(port);
console.log(`Server running at http://localhost:${port}`);

function serverJsonFile(req, res) {
  res.setHeader("Content-type", "application/json");
  fs.createReadStream(test)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}

function server(req, res) {
  console.log(req.url);
  res.end("hello");
}
