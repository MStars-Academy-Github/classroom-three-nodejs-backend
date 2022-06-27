const http = require("http");
const fs = require("fs");
const food = require("./module/food");

http
  .createServer((req, res) => {
    if (req.url === "/add/food") {
      if (req.method === "POST") {
        req.on("data", (chunk) => {
          fs.readFile("./data/foods.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              console.log(data);
              const arr = JSON.parse(data);
              const newData = JSON.parse(chunk);
              arr.push(newData);
              fs.writeFile("./data/foods.json", JSON.stringify(arr), (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("success !!!");
                }
              });
            }
          });
        });
        req.on("end", () => {
          console.log("end of data");
        });
      }
    }
    res.end("<h1>dada</h1>");
  })
  .listen(3000);
