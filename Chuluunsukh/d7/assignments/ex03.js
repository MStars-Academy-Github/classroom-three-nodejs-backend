const fs = require("fs");
const https = require("https");
const http = require("http");

let convertedData;

https
  .get("https://ghibliapi.herokuapp.com/films", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
      fs.writeFile(
        "./data/films.json",
        Buffer.concat(data).toString(),
        (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("success");
          }
        }
      );
    });
    res.on("end", () => {
      convertedData = Buffer.concat(data).toString();
    });
  })
  .on("error", (err) => {
    console.error(err);
  });

http
  .createServer(function (request, response) {
    fs.readFile("./data/films.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      } else {
        let films = JSON.parse(data);
        response.write(`
      <table>
      <tr>
      <th scope="col">Numbers</th>
      <th scope="col">Titles</th>
      <th scope="col">Images</th>
      </tr>
      ${films.map(
        (e, i) =>
          `<tr><td>${i + 1}</td><td>${e.title}</td><td><img> src=${
            e.image
          }></td> <tr>`
      )}
      </table>
      `);
        response.end();
      }
    });
  })
  .listen(3002);

console.log("server running at http://localhost:3002");
