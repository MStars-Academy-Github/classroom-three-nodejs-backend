const http = require("http");
const fs = require("fs");

const filename = `${__dirname}/data/doge.png`;
console.log(filename);

http
  .createServer((request, response) => {
    response.setHeader("Content-Type", "image/png");
    fs.createReadStream(filename)
      .on("error", () => {
        console.error("error");
      })
      .pipe(response);
  })
  .listen(3000);
console.log("Server running at https://localhost:3000");
