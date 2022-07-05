const http = require("http");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

http
  .createServer((request, response) => {
    response.end();
  })
  .listen(3000);
eventEmitter.on("start", () => {
  console.log("Хүсэлтийг амжилттай хүлээж авлаа");
});
eventEmitter.emit("start");
