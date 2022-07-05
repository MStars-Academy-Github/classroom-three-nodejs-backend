const https = require("https");
const http = require("http");
const fs = require("fs");
const EventEmitter = require("events");
const pathEmmitter = new EventEmitter();

let convertedData;
pathEmmitter.on("film", () => {
  console.log("films");
});

https
  // https ni huselt ywuulj baigaa tohioldold zowhon request baina
  .get("https://ghibliapi.herokuapp.com/films", (request) => {
    let data = [];
    if (request.url === "/films")
      if (request.method === "GET") {
        pathEmmitter.emit("film");
      }

    request.on("end", () => {
      convertedData = Buffer.concat(data).toString();
    });
  })
  .on("error", (err) => {
    console.error(err);
  });

http
  .createServer(function (request, response) {
    response.writeHead(200);
    response.write(JSON.stringify(convertedData));
    response.end();
  })
  .listen(3001);
console.log("Running at http://localhost:3001");
