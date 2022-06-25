const http = require("http");
const fs = require("fs");
const foodFile = `/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/03/data/food.json`;

http
  .createServer((request, response) => {
    console.log(`Request URL is ${request.url}`);
    console.log(`Request Method is ${request.method}`);
    if (request.url === "/add/food") {
      console.log("add food");
      if (request.method === "POST") {
        console.log("it is add food post method");
        request.on("data", (chunk) => {
          console.log(`Data chunk available : ${chunk}`);
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
        request.on("end", () => {
          console.log("end of data");
        });
      }
    }
    response.end("<h1>halo</h1>");
  })
  .listen(3000);
