const http = require("http");
const { parse } = require("path");
const fs = require("fs");

http
  .createServer((request, response) => {
    console.log(`Request URL is : ${request.url}`);
    console.log(`Request Method is : ${request.method}`);

    if (request.url === "/add/food") {
      console.log("add food");
      console.log(request);
      if (request.method === "POST") {
        console.log("It is add food Post method");
        request.on("data", (chunk) => {
          console.log(`Data chunk available: ${chunk}`);
          const newFood = JSON.parse(chunk);
          console.log(newFood);
          fs.readFile("./data/foods.json", "utf-8", (err, data) => {
            const temp = JSON.parse(data);
            if (err) {
              console.error(err);
            } else {
              temp.push(newFood);
              fs.writeFile("./data/foods.json", JSON.stringify(temp), (err) => {
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

    response.end("<h1>Hello</h1>");
  })
  .listen(3000);
