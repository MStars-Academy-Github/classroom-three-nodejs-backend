const server = require("http");

server
  .createServer((request, response) => {
    response.writeHead("200");
    response.write("<h1>Hello World!</h1>\n");
    response.end();
  })
  .listen(3000);
