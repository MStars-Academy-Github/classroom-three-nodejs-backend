// const EventEmitter = require("events");
// const EventEmitter = new EventEmitter();

// eventEmitter.on("start", () => {
//   console.log("started");
// });
// eventEmitter.emit("start");

const fs = require("fs");
const http = require("http");

http
  .createServer(function (request, response) {
    if (request.method === "POST") {
      console.log("It is send message Post method");
      request.on("data", (chunk) => {
        console.log(`Data chunk available: ${chunk}`);
        fs.readFile("./data/message.json", "utf-8", (err, data) => {
          if (err) {
            console.error(err);
            return;
          } else {
            const messageData = JSON.parse(data);

            const messageObject = JSON.parse(chunk);
            console.log(chunkObject);
            messageData.data.push(messageObject);

            fs.writeFile(
              "./data/message.json",
              JSON.stringify(messageData),
              (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("success");
                }
              }
            );
          }
        });
      });
      request.on("end", () => {
        // end of data
        console.log("end of data");
      });
    }
  })
  .listen(3000);
console.log('Server running at http://localhost"3000');
