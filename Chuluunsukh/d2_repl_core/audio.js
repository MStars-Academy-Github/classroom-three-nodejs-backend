const http = require("http");
const fs = require("fs");

const audiofile = `${__dirname}/audio/audio.mp3`;
console.log(filename);

http
  .createServer(function (request, response) {
    fs.createReadStream(filename)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  })
  .listen(3004);
console.log('Server running at http://localhost"3004');
