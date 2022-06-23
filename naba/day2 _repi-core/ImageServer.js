const http = require("http");
const fs = require("fs");

const filename = `${__dirname}/data/img/png`;
console.log(filename);

http
  .createServer((request, response) => {
    response.setHeader("Content-Type", "application/json");

    fs.createReadStream(filename)
      .on("error", () => {
        console.log(error);
      })
      .pipe(response);
  })
  .listen(3003);
