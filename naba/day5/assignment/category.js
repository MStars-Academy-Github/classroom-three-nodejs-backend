const http = require("http");
const serveJsonFile = require("./JsonServe");

http
  .createServer((request, response) => {
    console.log(`Request URL is : ${request.url}`);
    console.log(`Request Method is : ${request.method}`);

    if (request.url === "/add/category") {
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
    if (request.url === "/categories") {
      console.log("git all categories");
      console.log(request);
      if (request.method === "GET") {
        return serveJsonFile(request, response);
      }
    }
    if (request.url === "/update/category") {
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
    if (request.url === "/delete/category") {
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
  })
  .listen(3000);
console.log("naba s apps running");
