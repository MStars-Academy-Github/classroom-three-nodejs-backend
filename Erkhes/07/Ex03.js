const http = require("http");
const fs = require("fs");
const { table } = require("console");
http
  .createServer((request, response) => {
    // response.writeHead(200);
    // response.setHeader("Content-type", "text/html");
    const tableStart = "<table>";
    const tableEnd = "</table>";
    let endResult = "";
    let result = "";
    fs.readFile("./data/film.json", "utf-8", (err, data) => {
      if (err) {
        console.log("error");
      } else {
        const films = JSON.parse(data);
        films.shift();

        films.map((film, i) => {
          result += `<tr>
                        <td>${i + 1}</td>
                        <td>${film.title}</td>
                        <td>
                        <img src=${film.image} alt="img" />
                        </td>
                    </tr>`;
        });
      }

      endResult = tableStart + result + tableEnd;
      console.log(endResult);
      response.write(endResult);
      response.end();
    });
  })
  .listen(3002);
