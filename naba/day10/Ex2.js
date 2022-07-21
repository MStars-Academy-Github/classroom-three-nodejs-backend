const fs = require("fs");
const https = require("https");
const EventEmitter = require("events");
const EventEmitter = new EventEmitter();

https
  .createServer((request, response) => {
    https.get("https://ghibliapi.herokuapp.com/films", (res) => {
      res.on("data", (d) => {
        const temp = d.toString();
        fs.readFile("./data/film.json", "utf-8", (err, data) => {
          if (err) {
            console.log("hi");
          } else {
            fs.writeFile("./data/film.json", temp, (err) => {
              if (err) {
                console.log("error");
              } else {
                console.log("error");
              }
            });
          }
        });
      });
    });
    response.end("error");
  })
  .listen(3001);
