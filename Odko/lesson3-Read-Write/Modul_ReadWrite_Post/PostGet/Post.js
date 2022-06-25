const fs = require("fs");
var http = require("http");

const food = `${__dirname}/../jsonData/foods.json`;
const serverFood = require("../Module/food");
const serverAnimal = require("../Module/animal");

http
  .createServer((request, response) => {
    if (request.url === "/food") {
      console.log(request.method);
      if (request.method === "POST") {
        request.on("data", (chunk) => {
          fs.readFile("../jsonData/foods.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
            } else {
              let arr = JSON.parse(data);
              let chunk1 = JSON.parse(chunk);
              arr.push(chunk1);

              fs.writeFile(
                "../jsonData/foods.json",
                JSON.stringify(arr),
                (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log("cuscess");
                  }
                }
              );
            }
          });
        });
        request.on("end", () => {
          console.log("end");
        });
      }
    } else if (request.url === "/animal") {
      return serverAnimal(request, response);
    } else {
      response.end("server");
    }
    response.end();
  })
  .listen(3000);
console.log("server running at http://localhost:3000");
