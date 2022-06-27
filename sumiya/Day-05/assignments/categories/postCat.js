const http = require("http");
const fs = require("fs");

function addCategories(req, res) {
  http.createServer((req, res) => {
    if (req.url === "/add/categories" && req.method === "POST") {
      req.on("data", (chunk) => {
        fs.readFile(".data/category.json", "utf-8", (err, data) => {
          if (err) {
            console.error(err);
            return;
          } else {
            // console.log(data);
            const readData = JSON.parse(data);
            const newData = JSON.parse(chunk);
            readData.push(newData);
            fs.writeFile(
              ".data/category.json",
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
    res.end("<h1>dada</h1>");
  });
}

module.exports = addCategories;
