const fs = require("fs");
const http = require("http");

http
  .createServer((request, response) => {
    if (request.url === "/post") {
      if (request.method == "POST") {
        request.on("data", (chunk) => {
          fs.readFile("./data/test.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
            } else {
              const arr = JSON.parse(data);
              const chunkObj = JSON.parse(chunk);
              arr.push(chunkObj);
              console.log(data);
              fs.writeFile("./data/test.json", JSON.stringify(arr), (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(arr);
                }
              });
            }
          });
          console.log(`Data chunk available : ${chunk}`);
        });
        response.end();
      }
    } else if (request.url == "/get") {
      if (request.method == "GET") {
        fs.readFile("./data/test.json", "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            response.end(JSON.stringify(data));
          }
        });
      }
    }
  })
  .listen(3007);
