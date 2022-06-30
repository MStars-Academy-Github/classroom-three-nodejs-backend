const http = require("http");
const fs = require("fs");

const videofile = `${__dirname}/video/video.mp4`;
const audiofile = `${__dirname}/audio/audio.mp3`;
const imagefile = `${__dirname}/image/image.jpg`;
const filename = `${__dirname}/data/test.json`;

http
  .createServer(function (request, response) {
    if (request.url === "/json") {
      return servejsonFile(request, response);
    }
    if (request.url === "/video") {
      return serveVideoFile(request, response);
    }
    if (request.url === "/audio") {
      return serveAudioFile(request, response);
    }
    if (request.url === "/image") {
      return serveImageFile(request, response);
    } else {
      response.end("Not found");
    }
  })
  .listen(3000);
console.log('Server running at http://localhost"3000');

// serves json file
function servejsonFile(request, response) {
  response.setHeader("Content-type", "application/json");
  fs.createReadStream(filename)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}

// serves video file
function serveVideoFile(request, response) {
  response.setHeader("Content-type", "video/mp4");
  fs.createReadStream(videofile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}

//   serves audio file
function serveAudioFile(request, response) {
  response.setHeader("Content-type", "audio/mp3");
  fs.createReadStream(audiofile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}
//   serves image file
function serveImageFile(request, response) {
  response.setHeader("Content-type", "image/jpeg");
  fs.createReadStream(imagefile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}
