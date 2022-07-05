const http = require("http");
const https = require("https");
const EventEmitter = require("events");
const fs = require("fs");
const eventEmitter = new EventEmitter();
eventEmitter.on("films", async () => {
  https.get("https://ghibliapi.herokuapp.com/films ", async (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
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
      convertedData = Buffer.concat(data).toString();
    });
  });
});
http
  .createServer((request, response) => {
    if (request.url == "/films") {
      eventEmitter.emit("films");
    }
    response.end();
  })
  .listen(3001);
