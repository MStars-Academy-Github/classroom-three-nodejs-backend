const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const http = require("http");
const fs = require("fs");

// eventEmitter.on("start", () => {
//   console.log("start");
// });

// eventEmitter.emit("start");

http
  .createServer((request, response) => {
    console.log(request.url);
    if (request.url === "/post") {
      if (request.method === "POST") {
        console.log("it is add category GET method");
        request.on("data", (chunk) => {
          fs.readFile("./data/message.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              let arr = JSON.parse(data);
              let newData = JSON.parse(chunk);
              arr.push(newData);
              fs.writeFile(
                "./data/message.json",
                JSON.stringify(arr),
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
        response.end();
      }
    } else if (request.url === "/get") {
      if (request.method === "GET") {
        console.log("it is add category GET method");

        fs.readFile("./data/message.json", "utf-8", (err, data) => {
          if (err) {
            console.error(err);
            return;
          } else {
            response.end(data);
            console.log("Success");
          }
        });
      }
    }
  })

  .listen(3000);
console.log("Running");
