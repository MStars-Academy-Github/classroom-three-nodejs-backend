const http = require("http");

http
  .createServer((request, response) => {
    console.log(`url: ${request.url}`);
    console.log(`server ${request.method}`);
    response.end("<h1>hello</h1>");
  })
  .listen(3000);
