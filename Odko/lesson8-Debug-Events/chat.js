const http = require("http");
const fs = require("fs");

http
  .createServer((request, response) => {
    if (request.url === "/msg") {
      console.log(request.method);
      if (request.method === "POST") {
        request.on("data", (chunk) => {
          fs.readFile("data/text.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
            } else {
              let arr = JSON.parse(data);
              let chunk1 = JSON.parse(chunk);
              arr.push(chunk1);
              fs.writeFile("./data/text.json", JSON.stringify(arr), (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("cuscess");
                }
              });
            }
          });
        });
        request.on("end", () => {
          console.log("end");
        });
      }
    } else if (request.url === "/msgGet") {
      if (request.method === "GET") {
        fs.readFile("data/text.json", "utf-8", (err, data) => {
          if (err) {
            console.error(err);
          } else {
            const dataObj = JSON.parse(data);
            console.log(dataObj);
          }
        });
      }
    } else {
      response.end("server");
    }
    response.end();
  })
  .listen(3000);
console.log("server running at http://localhost:3000");
