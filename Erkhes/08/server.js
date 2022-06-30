const fs = require("fs");
const http = require("http");

http
  .createServer((request, response) => {
    response.setHeader("Content-type", "application/json");
    if (request.url === "/post" && request.method === "POST") {
      request.on("data", (chunk) => {
        fs.readFile("./data/test.json", "utf-8", (err, data) => {
          if (err) {
            console.log("err");
          } else {
            const datas = JSON.parse(data);
            const newData = JSON.parse(chunk);
            console.log(newData);
            datas.push(newData);
            fs.writeFile("./data/test.json", JSON.stringify(datas), (err) => {
              if (err) {
                console.log("error on write");
              } else {
                console.log("success");
              }
            });
          }
        });
        response.end("end");
      });
    }
    if (request.url === "/get" && request.method === "GET") {
      fs.readFile("./data/test.json", "utf-8", (err, data) => {
        if (err) {
          console.log("err");
        } else {
          response.end(data);
        }
      });
    }
  })
  .listen(3000);
