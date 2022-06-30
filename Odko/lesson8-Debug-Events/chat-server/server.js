const fs = require("fs");
const http = require("http");
const url = require("url");
const EventEmitter = require("events");
const chatEmitter = new EventEmitter();

http
  .createServer(function (request, response) {
    if (request.url === "/json") {
      console.log("<h1>Hello</h1>");
    } else if (request.url === "/image") {
      return serverImageFile(request, response);
    } else if (request.url.match(/^\/chat/)) {
      return respondChat(request, response);
    } else if (request.url === "/sse") {
      return respondSSE(request, response);
    } else if (request.url.match(/^\/static/)) {
      return respondStatic(request, response);
    } else {
      response.end("Not found");
    }
  })
  .listen(3000);
console.log("server running at http://localhost:3000");

function respondChat(req, res) {
  const parsedURL = url.parse(req.url, true);
  const chatMsg = parsedURL.query.message;

  chatEmitter.emit("message", chatMsg);
  res.end("chat");
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

//  this function servers all files inside public folder in dynamic way
function respondStatic(req, res) {
  const reqParam = req.url.slice(8);
  const filename = `${__dirname}/public/${reqParam}`;
  fs.createReadStream(filename)
    .on("error", () => {
      res.end("Not Found");
    })
    .pipe(res);
}
