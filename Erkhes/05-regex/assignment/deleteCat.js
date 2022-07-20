const http = require("http");
const fs = require("fs");
const url = require("url");
http
  .createServer((request, response) => {
    if (request.url.match(/^\/delete/) && request.method === "DELETE") {
      const parseUrl = url.parse(request.url, true);
      fs.readFile("../data/category.json", "utf-8", (err, data) => {
        const arr = JSON.parse(data);
        if (err) {
          console.error(err);
          return;
        } else {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i]._id === parseUrl.query.id) {
              arr.splice(i, 1);
              i--;
            }
          }
        }
        fs.writeFile("../data/category.json", JSON.stringify(arr), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("success !!!");
          }
        });
      });
    }
    response.end("delete");
  })
  .listen(3000);
