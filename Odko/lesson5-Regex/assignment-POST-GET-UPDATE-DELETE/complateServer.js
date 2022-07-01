const fs = require("fs");
var http = require("http");
const querystring = require("querystring");
const url = require("url");

http
  .createServer((request, response) => {
    if (request.url.match(/^\/api/)) {
      querystring.parse(request.url.split("?").slice(1).join(""));
      if (request.method === "POST") {
        console.log("POST");
        request.on("data", (chunk) => {
          fs.readFile("./data/category.json", "utf-8", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              let chunkData = JSON.parse(chunk);
              let dataJson = JSON.parse(data);
              dataJson.push(chunkData);

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
    } else if (request.url === "/getReq/category") {
      if (request.method === "GET") {
        console.log(request.method);
        fs.readFile("./data/category.json", "utf-8", (err, data) => {
          if (err) {
            console.error(err);
          } else {
            console.log(JSON.parse(data));
          }
        });
      }
    } else if (request.url.match(/^\/delete/)) {
      if (request.method === "DELETE") {
        // console.log(request.method);
        console.log(
          querystring.parse(request.url.split("?").slice(1).join(""))
        );
        fs.readFile("./data/category.json", "utf-8", (err, data) => {
          if (err) {
            console.error(err);
          } else {
            chunkData = JSON.parse(data);
            const result = chunkData.filter((category) => {
              return (
                `id=${category.id}` !== request.url.split("?").slice(1).join("")
              );
            });
            console.log(result);
          }
        });
      }
    } else if (request.url.match(/^\/update/)) {
      const parsedURL = url.parse(request.url, true);
      console.log(parsedURL.path);
      if (request.method === "PUT") {
        request.on("data", (chunk) => {
          fs.readFile("./data/category.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
            } else {
              chunkData1 = JSON.parse(chunk);
              categoryData = JSON.parse(data);
              const updateCategory = categoryData.map((food) => {
                if (food.id === chunkData1.id) {
                  return (food = chunkData1);
                } else {
                  return food;
                }
              });
              fs.writeFile(
                "./data/category.json",
                JSON.stringify(updateCategory),
                (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log("success");
                    console.log(updateCategory);
                  }
                }
              );
            }
          });
        });
      }
    }
    response.end();
  })
  .listen(3000);
console.log("server running at http://localhost:3000");
