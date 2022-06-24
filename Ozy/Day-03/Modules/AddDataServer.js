const http = require("http");
const fs = require("fs");

http
  .createServer((request, response) => {
    console.log(`Request URL is: ${request.url}`);
    console.log(`Request Method is : ${request.method}`);

    if (request.url === "/add/food") {
      console.log("add food");
      if (request.method === "POST") {
        console.log("it is add food Post method");
        request.on("data", (chunk) => {
          console.log(`Data chunk avaible : ${chunk}`);
          fs.readFile("./data/foods.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              let arr = JSON.parse(data);
              let newData = JSON.parse(chunk);
              arr.push(newData);
              fs.writeFile("./data/foods.json", JSON.stringify(arr), (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("success");
                }
              });
            }
          });
        });
        request.on("end", () => {
          console.log("end of data");
        });
      }
    }
    response.end("<h1>hello</h1>");
  })
  .listen(3000);
