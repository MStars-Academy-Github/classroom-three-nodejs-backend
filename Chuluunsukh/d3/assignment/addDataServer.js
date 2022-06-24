const { fstat } = require("fs");
const http = require("http");

http
  .createServer(function (request, response) {
    console.log(`Request URL is" ${request.url}`);
    console.log(`Request Method is" ${request.method}`);
    response.end("<h1>Hello</h1>");

    if (request.url === "/add/food") {
      console.log("add food");
      if (request.method === "POST") {
        console.log("It is add food and Post method");
        request.on("data", (chunk) => {
          console.log(`Data chunk available: ${chunk}`);
        });
        request.on("end", () => {
          // end of data
          console.log("end of data");
        });
      }
    }
  })
  .listen(3000);
console.log('Server running at http://localhost"3000');
