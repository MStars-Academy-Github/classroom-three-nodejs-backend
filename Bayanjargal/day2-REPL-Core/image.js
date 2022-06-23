const http = require("http");
const fs = require("fs");
const image = `${__dirname}/data/image/download.png`;
const audio = `${__dirname}/data/audio/audio.mp3`;
const video = `${__dirname}/data/video/video.mp4`;
console.log(filename);

http
  .createServer(function (request, response) {
    response.setHeader("Content-Type", "image/png");
    fs.createReadStream(image)
      .on("error", () => console.log("err"))
      .pipe(response);
  })
  .listen(3000);
console.log("server running at http://localhost:3000");
const bayna = {
  name: "bayna",
  age: "24",
  intrest: "basketball",
};