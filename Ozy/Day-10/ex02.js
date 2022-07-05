const http = require("http");
const EventEmitter = require("events");
const https = require("https");
const fs = require("fs");
const eventEmitter = new EventEmitter();

eventEmitter.on("films", (arr) => {
  fs.writeFile("./data/films.json", Buffer.concat(arr).toString(), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("success");
    }
  });
});

http
  .createServer((request, response) => {
    if (request.url === "/films") {
      https
        .get("https://ghibliapi.herokuapp.com/films", (res) => {
          let arr = [];
          res.on("data", (chunk) => {
            arr.push(chunk);
            eventEmitter.emit("films", arr);
          });
          res.on("end", () => {});
        })
        .on("error", (err) => {
          console.error(err);
        });
    }
    response.end();
  })
  .listen(3001);
console.log("Running");
