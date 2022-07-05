const http = require("http");
const fs = require("fs");
const url = require("url");
const EventEmitter = require("events");
const chatEmitter = new EventEmitter();
http
  .createServer(function (request, response) {
    if (request.url === "/sse") {
      return respondSSE(request, response);
    } else if (request.url.match(/^\/chat/)) {
      return respondChat(request, response);
    } else if (request.url.match(/^\/static/)) {
      return respondStatic(request, response);
    }
  })
  .listen(3000);
function respondStatic(req, res) {
  const reqParam = req.url.slice(8);
  const fileName = `${__dirname}/public/${reqParam}`;
  fs.createReadStream(fileName)
    .on("error", () => {
      res.end("Not Found");
    })
    .pipe(res);
}
function respondChat(req, res) {
  const parseURL = url.parse(req.url, true).query;
  chatEmitter.emit("message", parseURL.message);
  res.end();
}
function respondSSE(req, res) {
  res.writeHead(200, {
    "Content-type": "text/event-stream",
    Connection: "keep-alive",
  });
  const onMessage = (msg) => {
    res.write(`data: ${msg}\n\n`);
  };
  chatEmitter.on("message", onMessage);
  res.on("close", () => {
    chatEmitter.off("message", onMessage);
  });
}
