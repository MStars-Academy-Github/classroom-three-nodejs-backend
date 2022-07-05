const http = require("http");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("msg", () => {
  console.log("Хүсэлтийг амжилттай хүлээж авлаа");
});

http
  .createServer((request, response) => {
    if (request.url === "/msg") {
      eventEmitter.emit("msg");
    }
    response.end();
  })
  .listen(3000);
console.log("Running");
