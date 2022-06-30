const fs = require("fs");
const http = require("http");
const url = require("url");
const eventEmitter = require("events");
const chatEmitter = new eventEmitter();

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
  const chatMessage = reqParam.query.message;

  chatEmitter.emit("message", chatMessage);
  res.end();
}

function respondSSE(req, res) {
  res.writeHead(200, {
    "Content-type": "text/event-stream",
    Connection: "keep-alive",
  });

  const onMessage = (msg) => res.write(`data: ${msg}\n\n`);
  chatEmitter.on("message", onMessage);

  res.on("close", function () {
    chatEmitter.off("message", onMessage);
  });
}

// this function serves all files inside public folder in dynamic way
function respondStatic(req, res) {
  const reqParam = req.url.slice(8);
  const fileName = `${__dirname}/public/${reqParam}`;
  fs.createReadStream(fileName)
    .on("error", () => {
      res.end("Not Found");
    })
    .pipe(res);
}
