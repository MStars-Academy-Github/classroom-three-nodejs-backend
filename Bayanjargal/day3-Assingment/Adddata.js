const fs = require("fs");

const http = require("http");
const { json } = require("node:stream/consumers");

http
  .createServer((request, response) => {
    console.log(`Request URL is : ${request.url}`);
    console.log(`Request URL is : ${request.method}`);
    if (request.url == "/add/food") {
      console.log("add food");
      if (request.method === "POST") {
        console.log("it is add food Post method");
        console.log(request.body);
        request.on("data", (chunk) => {
          fs.readFile("./data/foods.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
            } else {
              const arr = JSON.parse(data);
              const chunkObj = JSON.parse(chunk);
              arr.push(chunkObj);
              console.log(data);
              fs.writeFile("./data/foods.json", JSON.stringify(arr), (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console(arr);
                }
              });
            }
          });

          console.log(`Data chunk available : ${chunk}`);
        });
        request.on("end", () => {
          console.log("end of data");
        });
      }
    } else if (request.method == "PUT") {
      request.on("data", (chunk) => {
        fs.readFile("./data/foods.json", "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const id = request.url;
            const foodId = id.slice(8);
            const arr = JSON.parse(data);
            const chunkObj = JSON.parse(chunk);
            const a = arr.map((arr) => (arr._id !== foodId ? chunkObj : ""));
            console.log(a);
            arr.push(a);
            fs.writeFile("./data/foods.json", JSON.stringify(arr), (err) => {
              if (err) {
                console.log(err);
              } else console.log(arr);
            });
          }
        });
      });
    }
    response.end("<h1>Helloo</h1>");
  })
  .listen(3004);
