const http = require("http");
const fs = require("fs");

const fileName = `${__dirname}/data/test.json`;

http
  .createServer(function (request, response) {
    fs.createReadStream(fileName)
      .on("error", () => {
        console.error("err");
      })
      .pipe(response);
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");
