const http = require("http");
const EventEmitter = require("events");
const portEmmitter = new EventEmitter();

portEmmitter.on("click", () => {
  console.log("Хүсэлтийг амжилттай хүлээж авлаа");
});

http
  .createServer(function (request, response) {
    if (request.url === "/event")
      if (request.method === "GET") {
        portEmmitter.emit("click");
      }
  })
  .listen(3000);
console.log('Server running at http://localhost"3000');
