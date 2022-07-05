const http = require("http");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const https = require("https");
const fs = require("fs");

eventEmitter.on("films", () => {
  console.log("films");
  https
    .get("https://ghibliapi.herokuapp.com/films", (res) => {
      console.log(res.statusCode);
      let data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
        Buffer.concat(data).toString();
        fs.writeFile(
          "./data/films.json",
          Buffer.concat(data).toString(),
          (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("success");
            }
          }
        );
      });
      res.on("end", () => {
        console.log(data);
        const convertedData = Buffer.concat(data).toString();
      });
    })
    .on("error", (err) => {
      console.error("Error %s", err.message);
    });
});
http
  .createServer((request, response) => {
    if (request.url === "/") {
      console.log("films");
    } else if (request.url === "/films") {
      eventEmitter.emit("films");
    }
    response.end();
  })
  .listen(3001);
