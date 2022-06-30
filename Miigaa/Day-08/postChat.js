const http = require("http");
const fs = require("fs");

http
  .createServer((request, response) => {
    console.log(`Request URL is : ${request.url}`);
    console.log(`Request Method is : ${request.method}`);

    if (request.url === "/add/message" && request.method === "POST") {
      console.log("It is add message Post method");
      request.on("data", (chunk) => {
        console.log(`Data chunk available: ${chunk}`);
        fs.readFile("./data/message.json", "utf-8", (err, data) => {
          if (err) {
            console.error(err);
            return;
          } else {
            console.log(data);
            const arr = JSON.parse(data);
            const newData = JSON.parse(chunk);
            arr.push(newData);
            fs.writeFile("./data/message.json", JSON.stringify(arr), (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log("success");
              }
            });
          }
        });
        response.end("");
      });
    } else if (request.url === "/get/message" && request.method === "GET") {
      console.log("Its a add message GET method");

      fs.readFile("./data/message.json", "utf-8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        } else {
          response.end(data);
        }
      });
    }
  })
  .listen(3000);
