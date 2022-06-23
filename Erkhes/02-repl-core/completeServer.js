const http = require("http");
const fs = require("fs");
const jsonFile = `${__dirname}/data/test.json`;
const imageFile = `${__dirname}/data/dog1.jpeg`;
const videoFile = `${__dirname}/data/fish.mp4`;
const audioFile = `${__dirname}/data/beat.mp3`;
http
  .createServer(function (request, response) {
    console.log(request.url);
    if (request.url == "/") {
      console.log("i am groot");
    } else if (request.url === "/json") {
      return serveJsonFile(request, response);
    } else if (request.url === "/image") {
      return serveImageFile(request, response);
    } else if (request.url === "/audio") {
      return serveAudioFile(request, response);
    } else if (request.url === "/video") {
      return serveVideoFile(request, response);
    } else {
      response.end("Not Found");
    }
  })
  .listen(3000);
console.log("Server running at https://localhost:3000");
// serves json file
function serveJsonFile(req, res) {
  res.setHeader("Content-type", "application.json");
  fs.createReadStream(jsonFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);
}
// serves image file
function serveImageFile(req, res) {
  res.setHeader("Content-type", "image/png");
  fs.createReadStream(imageFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);
}
// serves audio file
function serveAudioFile(req, res) {
  res.setHeader("Content-type", "audio/mpeg");
  fs.createReadStream(audioFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);
}
// serves video file
function serveVideoFile(req, res) {
  res.setHeader("Content-type", "video/mp4");
  fs.createReadStream(videoFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);
}
