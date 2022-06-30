const fs = require("fs");
const http = require("http");

http
  .createServer((request, response) => {
    response.setHeader("Content-type", "application/json");
    if (request.method === "GET") {
      fs.readFile("./data/test.json", "utf-8", (err, data) => {
        if (err) {
          console.log("err");
        } else {
          response.end(data);
        }
      });
    }
  })
  .listen(3000);
