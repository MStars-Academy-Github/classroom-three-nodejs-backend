var http = require("http");
const fs = require("fs");

const filename = `${__dirname}/data/Penguin.mp4`;
console.log(filename);

http
  .createServer((request, response) => {
    response.setHeader("Content-Type", "video/mp4");
    fs.createReadStream(filename)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  })
  .listen(3002);
