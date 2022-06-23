var http = require("http");
const fs = require("fs");

const filename = `${__dirname}/data/Noot.mp3`;
console.log(filename);

http
  .createServer((request, response) => {
    response.setHeader("Content-Type", "audio/mpeg");
    fs.createReadStream(filename)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  })
  .listen(3003);
