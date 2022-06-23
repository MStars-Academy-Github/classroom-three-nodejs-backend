var http = require("http");
const fs = require("fs");
const filename = `${__dirname}/data/a.png`;
const videoName = `${__dirname}/data/b.mp4`;
const audioName = `${__dirname}/data/c.mp3`;
const jsonName = `${__dirname}/data/test.json`;
// console.log(filename);

http
  .createServer(function (request, response) {
    // console.log(request.url);
    if (request.url === "/") {
      console.log("it is groot");
    } else if (request.url === "/json") {
      return serverJsonFile(request, response);
    } else if (request.url === "/image") {
      return serverImageFile(request, response);
    } else if (request.url === "/audio") {
      return serverAudioFile(request, response);
    } else if (request.url === "/video") {
      return serverVideoFile(request, response);
    } else response.end("Not Found");
  })
  .listen(3002);
console.log("Server running at http://localhost:3002");

// service audio file
function serverAudioFile(req, res) {
  res.setHeader("Content-type", "audio/mp3");

  fs.createReadStream(audioName)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}
// service video file
function serverVideoFile(req, res) {
  res.setHeader("Content-type", "video/mp4");

  fs.createReadStream(videoName)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}
// service Image file
function serverImageFile(req, res) {
  res.setHeader("Content-type", "image/png");

  fs.createReadStream(filename)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}
// service Json file
function serverJsonFile(req, res) {
  res.setHeader("Content-type", "application/json");
  fs.createReadStream(jsonName)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}
