const http = require("http");
const fs = require("fs");
const foodFile = `/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/03/data/food.json`;
http
  .createServer((request, response) => {
    if (request.url.match(/^\/update/) && request.method === "PUT") {
      console.log("this is working");
      request.on("data", (chunk) => {
        // console.log(`Data chunk available : ${chunk}`);
        let newFood = false;
        let i;
        fs.readFile("./data/foods.json", "utf-8", (err, data) => {
          const arr = JSON.parse(data);
          const newData = JSON.parse(chunk);

          if (err) {
            console.error(err);
            return;
          } else {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i]._id === newData._id) {
                arr.splice(i, 1);
                i--;
              }
            }
          }

          arr.push(newData);
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
