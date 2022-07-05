const http = require("http");
const fs = require("fs");
const EventEmitter = require("events");
const filmEmitter = new EventEmitter();
const https = require("https");
filmEmitter.on("films", () => {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const convertdata = JSON.parse(Buffer.concat(data).toString());
      fs.writeFile("./data/films.json", JSON.stringify(convertdata), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
    });
  });
});

http
  .createServer((request, response) => {
    if (request.url == "/films") {
      filmEmitter.emit("films");
    }
    response.end("HIIH");
  })
  .listen(3001);
