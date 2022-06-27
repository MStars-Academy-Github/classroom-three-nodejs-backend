var http = require("http");
const fs = require("fs");
const AudioServerFile = require("./AudioServer")

const JsonFile = `${__dirname}/data/test.json`;
const VideoFile = `${__dirname}/data/Penguin.mp4`;
const AudioFile = `${__dirname}/data/Noot.mp3`;
const ImageFile = `${__dirname}/data/penguin.jpeg`;

http
  .createServer((request, response) => {
    console.log(request.url);
    if (request.url === "/json") {
      return jsonServerFile(request, response);
    } else if (request.url === "/image") {
      return ImageServerFile(request, response);
    } else if (request.url === "/audio") {
      return AudioServerFile(request, response);
    } else if (request.url === "/video") {
      return VideoServerFile(request, response);
    } else {
      response.end("Not Found");
    }

    fs.createReadStream(JsonFile)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  })
  .listen(3000);

// server json file
function jsonServerFile(req, res) {
  res.setHeader("Content-Type", "application/json");
  fs.createReadStream(JsonFile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}
// server image file
function ImageServerFile(req, res) {
  res.setHeader("Content-Type", "image/png");
  fs.createReadStream(ImageFile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}

// server video file
function VideoServerFile(req, res) {
  res.setHeader("Content-Type", "video/mp4");
  fs.createReadStream(VideoFile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}
