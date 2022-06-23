var http = require("http");
const fs = require("fs");

const jsonFile = `${__dirname}/data/test.json`
const audioFile = `${__dirname}/data/peanut.mp3`
const videoFile = `${__dirname}/data/cweamy.mp4`
const imageFile = `${__dirname}/data/doge.png`

http
  .createServer((request, response) => {
    console.log(request.url)

    if(request.url === "/"){
        console.log("it is groot")
    }
    if(request.url === "/json"){
        console.log("it is json")
        return serveJsonFile(request, response);
    }
    if(request.url === "/image"){
        console.log("it is image")
        return serveImageFile(request, response);
    }
    if(request.url === "/video"){
        console.log("it is video")
        return serveVideoFile(request, response);
    }
    if(request.url === "/audio"){
        console.log("it is audio")
        return serveAudioFile(request, response);
    }
    response.end("Not Found")
  })
  .listen(3000);

// audio file  
function serveAudioFile(request, response){
    response.setHeader("Content-Type","audio/mp3")
    fs.createReadStream(audioFile)
        .on("error",()=>{
            console.log("error")
        })
        .pipe(response)
}

// json file 
function serveJsonFile(request, response){
    response.setHeader("Content-Type","application/json")
    fs.createReadStream(jsonFile)
      .on("error", () => {
        console.error("error");
      })
      .pipe(response);
}


// image file
function serveImageFile(request, response){
    response.setHeader("Content-Type","image/png")
    fs.createReadStream(imageFile)
        .on("error",()=>{
            console.log("error")
        })
        .pipe(response)
}

// video file
function serveVideoFile(request, response){
    response.setHeader("Content-Type","video/mp4")
    fs.createReadStream(videoFile)
        .on("error",()=>{
            console.log("error")
        })
        .pipe(response)
}


console.log("Server running at https://localhost:3000");
