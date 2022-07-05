const http = require("http");
const eventEmitter = require("events");
const rootEmitter = new eventEmitter();

rootEmitter.on("root", () => {
  console.log("Хүсэлтийг амжилттай хүлээж авлаа.");
});

http
  .createServer((req, res) => {
    if (req.url === "/") {
      rootEmitter.emit("root");
      res.end(`<h1>It is root</h1>`);
    } else {
      res.end(`Not Found`);
    }
  })
  .listen(3000);
