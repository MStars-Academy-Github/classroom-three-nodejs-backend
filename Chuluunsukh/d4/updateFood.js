const fs = require("fs");
const http = require("http");
const serveJsonFile = require("./JsonServe");

http
  .createServer((request, response) => {
    console.log(`Request URL is : ${request.url}`);
    console.log(`Request Method is : ${request.method}`);

    if (request.url === "/add/category") {
      console.log("get all categories");
      console.log(request);
      if (request.method === "GET") {
        request.on("data", (chunk) => {
          console.log(`Data chunk available: ${chunk}`);
        });
        request.on("end", () => {
          // end of data
          console.log("end of data");
        });
      }
    }
    if (request.url === "/api/categories") {
      console.log("get all categories");
      console.log(request);
      if (request.method === "GET") {
        request.on("data", (chunk) => {
          console.log(`Data chunk available: ${chunk}`);
        });
        request.on("end", () => {
          // end of data
          console.log("end of data");
        });
      }
    }
    if (request.url === "/update/category") {
      console.log("get all categories");
      console.log(request);
      if (request.method === "GET") {
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
      console.log("get all categories");
      console.log(request);
      if (request.method === "GET") {
        request.on("data", (chunk) => {
          console.log(`Data chunk available: ${chunk}`);
        });
        request.on("end", () => {
          // end of data
          console.log("end of data");
        });
      }
    }

    response.end("<h1>Working</h1>");
  })
  .listen(3000);
