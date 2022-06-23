const http = require("http");

http
  .createServer(function (request, response) {
    response.writeHead(200);
    response.write("<h1>Hello Node!!!</h1>\n");
    response.end();
  })
  .listen(3000);
console.log("Server running at https://localhost:3000");
