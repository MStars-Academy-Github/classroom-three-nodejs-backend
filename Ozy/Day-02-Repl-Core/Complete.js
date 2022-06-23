const http = require("http");
const fs = require("fs");

const audio = `${__dirname}/data/audio.mp3`;
const pic = `${__dirname}/data/pic.jpeg`;
const video = `${__dirname}/data/video.mp4`;
const json = `${__dirname}/data/test.json`;


http
  .createServer(function (request, response) {
    if(request.url === "/json"){
      return serverJsonFile(request, response)
    }
    if(request.url === "/video"){
      return serverVideoFile(request, response)
    }
    if(request.url === "/audio"){
      return serverAudioFile(request, response)
    }
    if(request.url === "/image"){
      return serverImageFile(request, response)
    }else(response.end("not found") )
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");


//Json file
function serverJsonFile(req, res){
    res.setHeader("Content-Type", "application/json")
    fs.createReadStream(json)
    
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);}


    //Audio file
function serverAudioFile(req, res){
    res.setHeader("Content-Type", "audio/mp3")
    fs.createReadStream(audio)
    
    .on("error", () => {
        console.error("err");
    })
    .pipe(res);}


    //Video file
function serverVideoFile(req, res){
    res.setHeader("Content-Type", "video/mp4")
    fs.createReadStream(video)
    
    .on("error", () => {
        console.error("err");
    })
    .pipe(res);}       

function serverImageFile(req, res){
    fs.createReadStream(pic)
    
    .on("error", () => {
        console.error("err");
    })
    .pipe(res);}   