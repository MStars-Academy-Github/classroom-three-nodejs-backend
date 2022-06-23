const http = require("http");
const fs = require("fs");

const jsonFile = `${__dirname}/data/test.json`;
const audioFile = `${__dirname}/data/test.json`;
const imageFile = `${__dirname}/data/test.json`;
const videoFile = `${__dirname}/data/test.json`;

http
  .createServer((request, response) => {
    console.log(request.url);

    if (request.url === '/') {
        console.log('it is groot')
    }

    if (request.url === '/json') {
        return serveJsonFile(request, response) 
    }

    if (request.url === '/image') {
        console.log('it is image')
    }


    if (request.url === '/video') {
        console.log('it is video')
    }

    if (request.url === '/audio') {
        console.log('it is audio')
    } else {

    response.end('Not Found');

    }
    
  })
  .listen(3004);

  // serves json file
  function serveJsonFile(req, res){
    res.setHeader("Content-Type", "application/json");
    fs.createReadStream(jsonFile)
      .on("error", () => {
        console.log("error");
      })
      .pipe(res); 
  }

  // serves audio file
  function serveAudioFile(req, res){
    res.setHeader("Content-Type", "audio/mp3");
    fs.createReadStream(audioFile)
      .on("error", () => {
        console.log("error");
      })
      .pipe(res); 
  }


  // serves image file
  function serveImageFile(req, res){
    res.setHeader("Content-Type", "image/png");
    fs.createReadStream(imageFile)
      .on("error", () => {
        console.log("error");
      })
      .pipe(res); 
  }

  // serves video file
  function serveVideoFile(req, res){
    res.setHeader("Content-Type", "audio/mp4");
    fs.createReadStream(videoFile)
      .on("error", () => {
        console.log("error");
      })
      .pipe(res); 
  }