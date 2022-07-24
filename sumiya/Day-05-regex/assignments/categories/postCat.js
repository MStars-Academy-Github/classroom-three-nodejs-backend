const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.url === "/api/categories") {
      if (req.method === "POST") {
        req.on("data", (chunk) => {
          fs.readFile("./data/category.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              const readData = JSON.parse(data);
              let newData = JSON.parse(chunk);
              if (err) {
                console.error(err);
                return;
              } else {
                for (let i = 0; i < readData.length; i++) {
                  if (readData[i]._id == newData._id) {
                    newData = null;
                  }
                }
              }
              newData == null ? readData : readData.push(newData);
              fs.writeFile(
                "./data/category.json",
                JSON.stringify(readData),
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
        req.on("end", () => {
          console.log("end of data");
        });
      }
    }

    res.end("<h1>dada</h1>");
  })
  .listen(3001);
