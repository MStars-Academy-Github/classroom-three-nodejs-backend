const http = require("http");
const fs = require("fs");

const JsonFile = `${__dirname}/data/animal.json`;

http
  .createServer(function (request, response) {
    response.setHeader("Content-Type", "application/json");
    fs.createReadStream(JsonFile)
      .on("error", () => {
        console.error("err");
      })
      .pipe(response);
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");
