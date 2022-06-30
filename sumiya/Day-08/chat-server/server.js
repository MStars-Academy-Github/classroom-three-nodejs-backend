var http = require("http");
const fs = require("fs");
const url = require("url");
const EventEmitter = require("events");
const chatEmitter = new EventEmitter();
// console.log(filename);

http
  .createServer(function (request, response) {
    // console.log(request.url);
    if (request.url === "/") {
      console.log("it is groot");
    } else if (request.url.match(/^\/chat/)) {
      return respondChat(request, response);
    } else if (request.url === "/sse") {
      return respondSSE(request, response);
    } else if (request.url.match(/^\/static/)) {
      return respondStatic(request, response);
    } else response.end("Not Found");
  })
  .listen(3002);
console.log("Server running at http://localhost:3002");

function respondChat(req, res) {
  const reqParam = url.parse(req.url, true);
  const chatMessage = reqParam.query.message;

  chatEmitter.emit("message", chatMessage);
  res.end();
}

function respondSSE(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });

  const onMessage = (msg) => res.write(`data: ${msg}\n\n`);
  chatEmitter.on("message", onMessage);

  res.on("close", function () {
    chatEmitter.off("message", onMessage);
  });
}

function respondStatic(req, res) {
  const reqParam = req.url.slice(8);
  const filename = `${__dirname}/public/${reqParam}`;
  fs.createReadStream(filename)
    .on("error", () => {
      res.end("Not Found");
    })
    .pipe(res);
}
