const http = require("http");
const https = require("https");
const serveFilms = require("./Films");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const port = 3001;

eventEmitter.on("submit", () => {
  console.log("Хүсэлтыг амжиллттай хүлээж авлаа");
  serveFilms();
});

http
  .createServer((req, res) => {
    if (req.url === "/films") {
      eventEmitter.emit("submit");
    }
  })
  .listen(port);
console.log(`running ${port}`);
