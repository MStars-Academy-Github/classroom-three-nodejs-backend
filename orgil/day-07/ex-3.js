const http = require("http");
const https = require("https");
const fs = require("fs");

http
  .createServer((req, res) => {
    https
      .get("https://ghibliapi.herokuapp.com/films", (result) => {
        console.log(result.statusCode);
        let data = [];
        result.on("data", (chunk) => {
          data.push(chunk);
        });
        result.on("end", () => {
          const convertedData = JSON.parse(data);
          fs.writeFile(
            "./data/ex-3-data.json",
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
    fs.readFile("./data/ex-3-data.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      } else {
        const temp = JSON.parse(data);
        res.end(
          `<table style="border:1px solid black">
          <tr style="border:1px solid black">
            <th style="border:1px solid black">Nr</th>
            <th style="border:1px solid black">Title</th>
            <th style="border:1px solid black; margin: auto">Image</th>
          </tr>
          ${temp.map((datas, i) => {
            return `<tr><th style="border:1px solid black">${
              i + 1
            }</th><td style="border:1px solid black">${
              datas.title
            }</td><td style="border:1px solid black; display: flex; justify-content: center"><img src=${
              datas.image
            } width="30%"></td></tr>`;
          })}
          </table>`
        );
      }
    });
  })

  .listen(3002);
