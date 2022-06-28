const http = require("http");
const fs = require("fs");

http
  .createServer((request, response) => {
    console.log(`Request URL is: ${request.url}`);
    console.log(`Request Method is : ${request.method}`);

    if (request.url.match(/^\/update/)) {
      console.log("Update food");
      let foodID = request.url.slice(8);
      if (request.method === "PUT") {
        console.log("it is update food PUT method");
        request.on("data", (chunk) => {
          console.log(`Data chunk avaible : ${chunk}`);
          fs.readFile("./data/foods.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              let arr = JSON.parse(data);
              let newData = JSON.parse(chunk);
              arr = arr.map((e) => {
                return e._id !== foodID ? e : newData;
              });
              fs.writeFile("./data/foods.json", JSON.stringify(arr), (err) => {
                if (err) {
                  console.error(err);
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
    response.end("<h1>Updated</h1>");
  })
  .listen(3000);