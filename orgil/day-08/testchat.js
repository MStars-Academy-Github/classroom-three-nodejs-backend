const http = require("http");
const fs = require("fs");
const eventEmitter = require("events");

http
  .createServer((req, res) => {
    if (req.url === "/send") {
      console.log("sending message...");
      if (req.method === "POST") {
        console.log("POST method working");
        req.on("data", (chunk) => {
          console.log(`Data chunk available ${chunk}`);
          const chat = JSON.parse(chunk);
          console.log(chat);
          fs.readFile("./data/chat.json", "utf-8", (err, data) => {
            const temp = JSON.parse(data);
            if (err) {
              console.error(err);
            } else {
              temp.push(chat);
              fs.writeFile("./data/chat.json", JSON.stringify(temp), (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("success");
                }
              });
            }
          });
        });
      }
      req.on("end", () => {
        console.log("ending");
      });
    }
    if (req.url === "/posts") {
      if (req.method === "GET") {
        console.log("GET method working...");
        fs.readFile("./data/chat.json", "utf-8", (err, data) => {
          if (err) {
            console.error(err);
            return;
          } else {
            console.log(JSON.parse(data));
          }
        });
      }
    }
    res.end("<h1>Hello</h1>");
  })
  .listen(3000);
