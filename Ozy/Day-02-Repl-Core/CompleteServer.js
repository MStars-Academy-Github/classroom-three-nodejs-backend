const http = require("http");
const fs = require("fs");

const JsonFile = `${__dirname}/data/test.json`;
const ImageFile = `${__dirname}/data/pic.jpeg`;
const AudioFile = `${__dirname}/data/audio.mp3`;
const VideoFile = `${__dirname}/data/video.mp4`;

http
  .createServer(function (request, response) {
    if (request.url === "/json") {
      return serverJsonFile(request, response);
    }
    if (request.url === "/video") {
      return serverVideoFile(request, response);
    }
    if (request.url === "/audio") {
      return serverAudioFile(request, response);
    }
    if (request.url === "/image") {
      return serverImageFile(request, response);
    } else response.end("not found");
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");

//Json file server
function serverJsonFile(request, response) {
  response.setHeader("Content-Type", "application/json");
  fs.createReadStream(JsonFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(response);
}

// Audio file server
function serverAudioFile(request, response) {
  response.setHeader("Content-Type", "audio/mp3");
  fs.createReadStream(AudioFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(response);
}

//Video file server
function serverVideoFile(request, response) {
  response.setHeader("Content-Type", "video/mp4");
  fs.createReadStream(VideoFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(response);
}

//Image file server
function serverImageFile(request, response) {
  response.setHeader("Content-Type", "image/jpeg");
  fs.createReadStream(ImageFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(response);
}
