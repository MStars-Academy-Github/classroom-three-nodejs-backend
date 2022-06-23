const http = require("http");
const fs = require("fs");
const json = `${__dirname}/data/test.json`;
const image = `${__dirname}/data/image/download.png`;
const audio = `${__dirname}/data/audio/audio.mp3`;
const video = `${__dirname}/data/video/video.mp4`;

http
  .createServer(function (request, response) {

    if(request.url === '/'){
        console.log("root")
    }
     else if(request.url === '/json'){
        console.log("its json")
        return serveJsonFile(request,response)
    }
    else if(request.url === '/audio'){
        return audioServeFile(request,response)
        console.log("its audio")
    }
    else if(request.url === '/video'){
        return videoServeFile(request,response)
        console.log("its video")
    }
    else if(request.url === '/image'){
        return imageServeFile(request,response)
        console.log("its image")
    }else( response.end("not found"))
   
  })
  .listen(3000);
console.log("server running at http://localhost:3000");

// serves json file
function serveJsonFile (request , response){
    response.setHeader("Content-Type","application/json")
    fs.createReadStream(json)
        .on("error",()=>{
            console.log("error")
        })
        .pipe(response)

}

// auddio file
function audioServeFile (request , response){
    response.setHeader("Content-Type","audio/mp3")
    fs.createReadStream(audio)
        .on("error",()=>{
            console.log("error")
        })
        .pipe(response)

}
// image file
function imageServeFile(request , response){
    response.setHeader("Content-Type","image/png")
    fs.createReadStream(image)
        .on("error",()=>{
            console.log("error")
        })
        .pipe(response)

}
// video file
function videoServeFile(request , response){
    response.setHeader("Content-Type","audio/mp3")
    fs.createReadStream(video)
        .on("error",()=>{
            console.log("error")
        })
        .pipe(response)

}