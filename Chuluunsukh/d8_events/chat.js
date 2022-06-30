const fs = require("fs");
const http = require("http");
const filename = `${__dirname}/data/message.json`;
http
  .createServer(function (request, response) {
    if (request.url == "/msg") {
      if (request.method === "POST") {
        request.on("data", (chunk) => {
          fs.readFile("data/message.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
            } else {
              let arr = JSON.parse(data);
              let chunk1 = JSON.parse(chunk);
              arr.push(chunk1);
              fs.writeFile("data/message.json", JSON.stringify(arr), (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("sucsess");
                }
              });
            }
          });
        });
        response.end();
        ç;
      }
    } else if (request.url === "/read") {
      if (request.method === "GET") {
        fs.createReadStream(filename)
          .on("error", () => {
            console.log("error");
          })
          .pipe(response);
      }
    }
  })
  .listen(3000);
console.log('Server running at http://localhost"3000');
