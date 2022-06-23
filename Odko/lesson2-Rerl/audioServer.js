var http = require("http");
const file = require("fs");

const filename = `${__dirname}/data/song.mp3`;

console.log(filename);

http
  .createServer(function (request, response) {
    response.setHeader("Content-Type", "audio/mpeg");
    file
      .createReadStream(filename)
      .on("error", () => {
        console.error("error");
      })
      .pipe(response);
  })
  .listen(3000);
console.log("server running at http://localhost:3000");
