const fs = require("fs");
const http = require("http");
const url = require("url");
const EventEmitter = require("events");
const chatEmitter = new EventEmitter();

http
  .createServer((request, response) => {
    if (request.url === "/") {
      response.end("<h1>It is root</h1>");
    } else if (request.url.match(/^\/chat/)) {
      return respondChat(request, response);
    } else if (request.url === "/sse") {
      return respondSSE(request, response);
    } else if (request.url.match(/^\/static/)) {
      return respondStatic(request, response);
    } else {
      response.end("Not Found");
    }
  })
  .listen(3000);

function respondChat(req, res) {
  const reqParam = url.parse(req.url, true);
  const messageChat = reqParam.query.message;
  console.log(messageChat);

  chatEmitter.emit("message", messageChat);
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
      res.end("Not found");
    })
    .pipe(res);
}
