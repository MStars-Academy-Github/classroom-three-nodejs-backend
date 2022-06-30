const https = require("https");
const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    https
      .get("https://ghibliapi.herokuapp.com/films", (res) => {
        console.log(res.statusCode);
        let data = [];
        res.on("data", (chunk) => {
          data.push(chunk);
        });
        res.on("end", () => {
          const convertedData = JSON.parse(data);
          console.log(convertedData);
          fs.writeFile(
            "./data/ex-2-data.json",
            JSON.stringify(convertedData),
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("success");
              }
            }
          );
        });
      })
      .on("error", (err) => {
        console.log(err);
      });
    res.end("<h1>HELLO</h1>");
  })
  .listen(3001);
