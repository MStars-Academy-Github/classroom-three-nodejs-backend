const http = require("http");
const fs = require("fs");
const fileName = `${__dirname}/data/beat.mp3`;

console.log(fileName);

http
  .createServer(function (request, response) {
    response.setHeader("Content-type", "audio.mpeg");
    fs.createReadStream(fileName)
      .on("error", () => {
        console.error("err");
      })
      .pipe(response);
    // response.writeHead(200);
    // response.setHeader("Content-type", "application/json");
    // response.write(
    //   JSON.stringify({
    //     name: "Erkhes",
    //     gender: "male",
    //     interest: "manga",
    //   })
    // );
    // response.end();
  })
  .listen(3000);
console.log("Server running at https://localhost:3000");
