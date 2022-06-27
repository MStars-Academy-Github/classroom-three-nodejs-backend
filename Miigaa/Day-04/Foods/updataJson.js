const http = require("http");
const fs = require("fs");

http
  .createServer((request, response) => {
    if (
      request.url.match(
        request.url.match(/^\/update/) && request.method === "PUT"
      )
    ) {
      console.log("It is a food put method");
      request.on("data", (chunk) => {
        console.log(`Data chunk available ${chunk}`);
        fs.readFile("./data/food.json", "utf-8", (err, data) => {
          const arr = JSON.parse(data);
          const newData = JSON.parse(chunk);
          let newArr;
          if (err) {
            console.error(err);
            return;
          } else {
            newArr = arr.filter((e) => e._id !== newData._id);
          }
          newArr.push(newData);
          fs.writeFile("./data/food/json", JSON.stringify(newArr), (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("success");
            }
          });
        });
      });
      request.on("end", () => {
        console.log("end of dta");
      });
    }
    response.end("Hello");
  })
  .listen(3000);
