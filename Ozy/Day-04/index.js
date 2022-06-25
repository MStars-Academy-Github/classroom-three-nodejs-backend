const fs = require("fs");
const http = require("http");
const JsonFile = `${__dirname}/data/test.json`;

http
  .createServer((req, res) => {
    if (req.url === "/json") {
      fs.createReadStream(JsonFile)
        .on("error", () => {
          console.error("err");
        })
        .pipe(res);
    } else if (req.url === "/") {
      res.write("<h1>Hello!!!</h1>\n");
      res.end();
    } else {
      res.end("not found");
    }
  })
  .listen(3000);
