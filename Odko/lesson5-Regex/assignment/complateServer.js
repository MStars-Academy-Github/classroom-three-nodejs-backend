const fs = require("fs");
var http = require("http");
const querystring = require("querystring");

http
  .createServer((request, response) => {
    if (request.url.match(/^\/api/)) {
      console.log(request.method);
      console.log(querystring.parse(request.url.split("?").slice(1).join("")));
      if (request.method === "POST") {
        console.log("POST");
        request.on("data", (chunk) => {
          fs.readFile("./data/category.json", "utf-8", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              let chunkData = JSON.parse(chunk);
              let dataJson = JSON.parse(data);
              let index = dataJson.indexOf(chunkData);
              index ? "boldon" : dataJson.push(chunkData);
              fs.writeFile(
                "./data/category.json",
                JSON.stringify(dataJson),
                (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("success");
                    // console.log(dataJson);
                  }
                }
              );
            }
          });
        });
        response.end("POST");
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
