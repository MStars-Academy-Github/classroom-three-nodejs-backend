const http = require("http");
const https = require("https");
const fs = require("fs");
const eventEmitter = require("events");
const filmsEmitter = new eventEmitter();

http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.end("It is root");
    } else if (req.url === "/films/show") {
      filmsEmitter.emit("films-show");
      res.end("films-show end");
    } else {
      res.end("Not Found");
    }
  })
  .listen(3002);

filmsEmitter.on("films-show", () => {
  const filmsFile = JSON.parse(fs.readFileSync("./data/films.json", "utf-8"));
});
