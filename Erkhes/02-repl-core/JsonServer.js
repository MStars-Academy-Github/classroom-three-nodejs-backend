const http = require("http");
const fs = require("fs");
const jsonFile = `${__dirname}/data/test.json`;

http
  .createServer(function (request, response) {
    fs.createReadStream(jsonFile)
      .on("error", () => {
        console.error("err");
      })
      .pipe(response);
  })
  .listen(3000);
console.log("Server running at https://localhost:3000");
