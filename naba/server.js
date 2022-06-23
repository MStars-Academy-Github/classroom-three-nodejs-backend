var http = require("http");

http
  .createServer(function (request, response) {
    response.writeHead(200);
    response.write("<h1>hello node!!!</h1\n>");
    response.end();
  })
  .listen(3000);
console.log("server running at http://localhost:3000");
