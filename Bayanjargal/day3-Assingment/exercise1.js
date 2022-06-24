const http = require("http");
const fs = require("fs");
const jsondata = `${__dirname}/data/info.json`;

console.log(jsondata)

http
  .createServer(function (request, response) {
    response.setHeader("Content-Type", "application/json");
    fs.createReadStream(jsondata)
      .on("error", () => console.log("err"))
      .pipe(response);
  })
  .listen(3000);
console.log("server running at http://localhost:3000");

