var http = require("http");
const fs = require("fs");
const filename = `${__dirname}/data/a.png`;
const videoName = `${__dirname}/data/b.mp4`;
const audioName = `${__dirname}/data/c.mp3`;
const jsonName = `${__dirname}/data/test.json`;
// console.log(filename);

http
  .createServer(function (request, response) {
    response.setHeader("Content-type", "application/json");

    fs.createReadStream(jsonName)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  })
  .listen(3005);
console.log("Server running at http://localhost:3005");
