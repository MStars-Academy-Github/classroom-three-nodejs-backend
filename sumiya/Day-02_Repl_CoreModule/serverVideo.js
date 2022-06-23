var http = require("http");
const fs = require("fs");
const filename = `${__dirname}/data/a.png`;
const videoName = `${__dirname}/data/b.mp4`;
const audioName = `${__dirname}/data/c.mp3`;
// console.log(filename);

http
  .createServer(function (request, response) {
    response.setHeader("Content-type", "video/mp4");

    fs.createReadStream(videoName)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  })
  .listen(3003);
console.log("Server running at http://localhost:3003");
