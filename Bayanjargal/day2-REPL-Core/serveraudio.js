const http = require("http");
const fs = require("fs");
const audio = `${__dirname}/data/audio/audio.mp3`;
http
  .createServer(function (request, response) {
    response.setHeader("Content-Type", "audio/mpeg");
    fs.createReadStream(audio)
      .on("error", () => console.log("err"))
      .pipe(response);
  })
  .listen(3000);
console.log("server running at http://localhost:3000");

