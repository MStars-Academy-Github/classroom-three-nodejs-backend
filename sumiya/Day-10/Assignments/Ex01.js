const http = require("http");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("submit", () => {
  console.log("Хүсэлтыг амжиллттай хүлээж авлаа");
});
http
  .createServer((req, res) => {
    if (req.url === "/") {
      eventEmitter.emit("submit");
      res.end();
    }
  })
  .listen(3000);
