const fs = require("fs");
const http = require("http");
const querystring = require("querystring");
const url = require("url");
const serverFile = require("./serverFile");

const testfile = `${__dirname}/data/test.json`;

http
  .createServer((req, res) => {
    if (req.url === "/json") {
      fs.createReadStream(testfile)
        .on("error", () => {
          console.error("error");
        })
        .pipe(res);
    } else if (req.url === "/") {
      res.write("<h1>Hello world<h1>");
      res.end();
    } else if (req.url.match(/^\/static/)) {
      /* dynamic path hiine "/^\/static/" static gesen ug orson l bol hoino ni yu zalgasan bolno */

      console.log(req.url.slice(8));
      res.end("Static");
    } else if (req.url.match(/^\/food/)) {
      console.log(querystring.parse(req.url.split("/").slice(1).join("")));
      //   path ? or / modul
      res.end("foods");
    } else if (req.url.match(/^\/categories/)) {
      const parsedURL = url.parse(req.url, true);
      console.log(parsedURL);
      res.end("categories");
    } else if (req.url.match(/^\/public/)) {
      console.log("route PUBLIC");
      return serverFile(req, res);
    } else {
      res.end("Not Found");
    }
  })
  .listen(3000);
console.log("running localhost3000");
