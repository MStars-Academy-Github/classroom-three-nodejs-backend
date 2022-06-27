const http = require("http");
const fs = require("fs");
const category = `../data/category.json`;

http
  .createServer((request, response) => {
    if (request.url === "/api/categories") {
      console.log("add category");
      if (request.method === "POST") {
        request.on("data", (chunk) => {
          console.log(`Data chunk available : ${chunk}`);
          fs.readFile("../data/category.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              const arr = JSON.parse(data);
              let newData = JSON.parse(chunk);

              for (let i = 0; i < arr.length; i++) {
                if (arr[i]._id == newData._id) {
                  newData = null;
                }
              }
              newData == null ? arr : arr.push(newData);
              fs.writeFile(
                "../data/category.json",
                JSON.stringify(arr),
                (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log("success !!!");
                  }
                }
              );
            }
          });
        });
        request.on("end", () => {
          console.log("end of data");
        });
      }
    }
    response.end("added category");
  })
  .listen(3000);
