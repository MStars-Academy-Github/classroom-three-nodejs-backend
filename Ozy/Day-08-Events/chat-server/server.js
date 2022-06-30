const fs = require("fs");
const http = require("http");
const url = require("url");
const EventEmitter = require("events");
const chatEmmitter = new EventEmitter();

http
  .createServer((request, response) => {
    if (request.url === "/") {
      response.end("<h1>It is root</h1>");
    } else if (request.url.match(/^\/chat/)) {
      console.log("chat");
      return respondChat(request, response);
    } else if (request.url === "/sse") {
      return respondSSE(request, response);
    } else if (request.url.match(/^\/static/)) {
      return respondStatic(request, response);
    } else {
      response.end("not found");
    }
  })
  .listen(3004);
console.log("Server running at http://localhost:3004");

function respondChat(request, response) {
  const reqParam = url.parse(request.url, true);
  const chatMessage = reqParam.query.message;
  chatEmmitter.emit("message", chatMessage);
  response.end();
}

function respondSSE(request, response) {
  response.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });

  const onMessage = (msg) => response.write(`data: ${msg}\n\n`);
  chatEmmitter.on("message", onMessage);
  response.on("close", function () {
    chatEmmitter.off("message", onMessage);
  });
}
//// this function serves all files inside public folder in dynamic way
function respondStatic(request, response) {
  const reqParam = request.url.slice(8);
  const fileName = `${__dirname}/public/${reqParam}`;
  fs.createReadStream(fileName)
    .on("error", () => {
      response.end("Not Found");
    })
    .pipe(response);
}
