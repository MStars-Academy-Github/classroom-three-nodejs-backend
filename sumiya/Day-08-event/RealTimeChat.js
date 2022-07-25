const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.method === "POST" && req.url === "/post") {
      req.on("data", (chunk) => {
        arr = [];
        const newData = JSON.parse(chunk);
        arr.push(newData);
        fs.writeFile("./data/message.json", JSON.stringify(arr), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("success !!!");
          }
        });
        res.end("");
      });
      req.on("end", () => {
        console.log("end of data");
      });
    } else if (req.method === "GET" && req.url === "/get") {
      console.log("test");
      fs.createReadStream("./data/message.json", "utf-8")
        .on("error", () => {
          console.log("error");
        })
        .pipe(res);
    }
  })
  .listen(3000);
