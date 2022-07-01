const fs = require("fs");
const http = require("http");

http
  .createServer((request, response) => {
    if (request.url === "/post") {
      console.log("add food");
      console.log(request);
      if (request.method === "POST") {
        console.log("It is add food Post method");
        request.on("data", (chunk) => {
          console.log(`Data chunk available: ${chunk}`);
          fs.writeFile("./data/message.json", data, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("success");
            }
          });
        });
        request.on("end", () => {
          // end of data
          console.log("end of data");
        });
      }
      response.end();
    }
  })
  .listen(3000);
