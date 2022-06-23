const http = require("http");
const fs = require("fs");
const audioFile = `${__dirname}/data/beat.mp3`;

http
  .createServer(function (request, response) {
    response.setHeader("Content-type", "audio.mpeg");
    fs.createReadStream(audioFile)
      .on("error", () => {
        console.error("err");
      })
      .pipe(response);
  })
  .listen(3000);
console.log("Server running at https://localhost:3000");
