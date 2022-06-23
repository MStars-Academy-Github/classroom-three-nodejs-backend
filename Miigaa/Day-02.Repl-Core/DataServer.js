var http = require("http");
const fs = require("fs");

const filename = `${__dirname}/data/test.json`;
console.log(filename);

http
  .createServer((request, response) => {
    fs.createReadStream(filename)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  })
  .listen(3000);
