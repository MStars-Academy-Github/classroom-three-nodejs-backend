const fs = require("fs");
const https = require("https");
const EventEmitter = require("events");
const EventEmitter = new EventEmitter();

https
  .createServer((request, response) => {
    if (request.url === "/post") {
      console.log("hell world");
      console.log(request);
      if (request.method === "POST") {
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
          console.log("Хүсэлтийг амжилттай хүлээж авлаа");
        });
      }
      response.end();
    }
  })
  .listen(3000);
