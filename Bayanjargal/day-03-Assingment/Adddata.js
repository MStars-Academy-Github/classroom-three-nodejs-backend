const fs = require("fs");
const url = require("url");
const http = require("http");

http
  .createServer((request, response) => {
    console.log(`Request URL is : ${request.url}`);
    console.log(`Request URL is : ${request.method}`);
    const parseURL = url.parse(request.url, true);
    const foodID = parseURL.search.split("?")[1];
    console.log(foodID);
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
    } else if (request.method === "PUT") {
      request.on("data", (chunk) => {
        fs.readFile("./data/foods.json", "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const arr = JSON.parse(data);
            const chunkObj = JSON.parse(chunk);
            const a = arr.map((arr) => (arr._id == foodID ? "" : chunkObj));
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
    } else if (request.method === "DELETE") {
      request.on("data", () => {
        fs.readFile("./data/foods.json", "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            let arr = JSON.parse(data);
            arr = arr.filter((food) => food._id !== foodID);
            fs.writeFile("./data/foods.json", JSON.stringify(arr), (err) => {
              if (err) {
                console.log(err);
              } else console.log("success");
            });
          }
        });
      });
    }
    response.end("<h1>Helloo</h1>");
  })
  .listen(3004);
