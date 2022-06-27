const http = require("http");

http
  .createServer((request, response) => {
    console.log(`Request URL is : ${request.url}`);
    console.log(`Request Method is : ${request.method}`);

    if (request.url === "/add/food") {
      console.log("add food");
      console.log(request);
      if (request.method === "POST") {
        console.log("It is add food Post method");
        request.on("data", (chunk) => {
          console.log(`Data chunk available: ${chunk}`);
        });
        request.on("end", () => {
          // end of data
          console.log("end of data");
        });
      }
    }

    response.end("<h1>Hello</h1>");
  })
  .listen(3000);
