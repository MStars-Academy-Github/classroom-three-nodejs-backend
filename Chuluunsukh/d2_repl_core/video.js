const http = require("http");
const fs = require("fs");

const videofile = `${__dirname}/video/video.mp4`;
console.log(filename);

http
  .createServer(function (request, response) {
    response.setHeader("Content-type", "audio/mp4");
    fs.createReadStream(filename)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  })
  .listen(3001);
console.log('Server running at http://localhost"3001');
