const http = require("http");
const EventEmitter = require("events");
const serverEvents = new EventEmitter();

serverEvents.on("click", () => {
  console.log("Хүсэлтийг амжилттай хүлээж авлаа");
});

http
  .createServer((req, res) => {
    if (req.url === "/event") {
      //   console.log(req.url);
      serverEvents.emit("click");
    }
    res.write("<h1>HI</h1>");
    res.end();
  })
  .listen(3000);
console.log("running 3000");
