const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    fs.readFile("data/films.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        dataJson = JSON.parse(data);
        res.write(
          dataJson.map((a, i) => {
            return `<table>
            <tr>
              <td>${a.title}</td>
              <td>${a.title}</td>
              <td>${a.title}</td>
            </tr>

          </table>`;
          })
        );
      }
    });

    res.end();
  })
  .listen(3000);
console.log("runninggit  http://localhost:3000/");
