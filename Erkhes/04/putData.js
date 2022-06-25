const http = require("http");
const fs = require("fs");
const foodFile = `/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/03/data/food.json`;

http
  .createServer((request, response) => {
    if (request.url.match(/^\/update/) && request.method === "PUT") {
      console.log("this is working");
      request.on("data", (chunk) => {
        console.log(`Data chunk available : ${chunk}`);
        fs.readFile("./data/foods.json", "utf-8", (err, data) => {
          const arr = JSON.parse(data);
          const newData = JSON.parse(chunk);
          let newFood;
          if (err) {
            console.error(err);
            return;
          } else {
            arr.map((food) => {
              if (food._id != chunk._id) {
                console.log("food dont exist");
              } else {
                console.log("food do exist");
              }
            });
          }
          newFood != undefined || null ? arr.push(newFood) : "";
          fs.writeFile("./data/foods.json", JSON.stringify(arr), (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("success !!!");
            }
          });
        });
      });
    }
    response.end("update");
  })
  .listen(3000);
