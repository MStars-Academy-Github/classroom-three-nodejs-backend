const http = require("http");
const fs = require("fs");

const audio = `${__dirname}/data/audio.mp3`;

http
  .createServer(function (request, response) {
    response.setHeader("Content-Type", "audio/mp3");
    fs.createReadStream(audio)
      .on("error", () => {
        console.error("err");
      })
      .pipe(response);
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");
