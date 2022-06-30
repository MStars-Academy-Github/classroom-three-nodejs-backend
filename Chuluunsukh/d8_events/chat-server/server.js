// back-end heseg
const fs = require("fs");
const http = require("http");
const url = require("url");
const EventEmitter = require("events");
const chatEmmitter = new EventEmitter();

http
  .createServer(function (request, response) {
    if (request.url === "/") {
      response.end("<h1>it is</h1>");
    } else if (request.url.match(/^\/chat/)) {
      return respondChat(request, response);
    } else if (request.url.match(/^\/static/)) {
      return respondStatic(request, response);
    } else if (request.url === "/sse") {
      return respondSSE(request, response);
    } else {
      response.end("Not found");
    }
  })
  .listen(3000);
console.log("local host 3000 running");

function respondChat(req, res) {
  const reqParam = url.parse(req.url, true);
  const chatMessage = reqParam.query.message;
  console.log(chatMessage);
  chatEmmitter.emit("message", chatMessage);
  res.end();
}
function respondSSE(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  const onMessage = (msg) => res.write(`data: ${msg}\n\n`);
  chatEmmitter.on("message", onMessage);

  res.on("close", function () {
    chatEmmitter.off("message", onMessage);
  });
}

//   this function serves all files inside public folder in dynamic way
function respondStatic(req, res) {
  const reqParam = req.url.slice(8);
  const filename = `${__dirname}/public/${reqParam}`;
  fs.createReadStream(filename)
    .on("error", () => {
      res.end("Not Found");
    })
    .pipe(res);
}
