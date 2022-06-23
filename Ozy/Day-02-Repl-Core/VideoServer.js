const http = require("http");
const fs = require("fs");

const video = `${__dirname}/data/video.mp4`;

http
  .createServer(function (request, response) {
    response.setHeader("Content-Type", "video/mp4");
    fs.createReadStream(video)
      .on("error", () => {
        console.error("err");
      })
      .pipe(response);
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");
