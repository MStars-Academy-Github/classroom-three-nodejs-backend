const http = require("http");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

http
  .createServer((req, res) => {
    if (req.url === "/") {
      eventEmitter.on("submit", () => {
        console.log("Хүсэлтыг амжиллттай хүлээж авлаа");
      });
    }

    eventEmitter.emit("submit");
  })
  .listen(3000);
