const fs = require("fs");
const http = require("http");

http
  .createServer((request, response) => {
    console.log(request.url);
    if (request.url === "/") {
      response.end("<h1>It is root</h1>");
    } else if (request.url === "/chat") {
      return respondChat(request, response);
    } else if (request.url === "/sse") {
      return respondSSE(request, response);
    } else if (request.url.match(/^\/static/)) {
      return respondStatic(request, response);
    } else {
      respond.end("Not Found");
    }
  })
  .listen(3000);

function respondChat(req, res) {
  res.end("chat");
}

function respondSSE(req, res) {
  res.end("sse");
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
