const https = require("https");
const fs = require("fs");
const http = require("http");
const serveFilms = require("./serve");

http
  .createServer((request, response) => {
    serveFilms();
    fs.readFile("./data/Ex03.json", "utf-8", (err, data) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      if (err) {
        console.error(err);
      } else {
        console.log(data);
        let filmsJson = JSON.parse(data);
        console.log(filmsJson);
        fs.writeFile(
          "mynewfile3.html",
          `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
          </head>
          <body><table>
        <tr>
          <td scope="col">No</td>
          <td scope="col">Garchig</td>
          <td scope="col">zurag</td>
        </tr>
        <tr>
        <td > ${filmsJson.map((e, i) => i + 1)}\n</td>
        <td > ${filmsJson.map((e) => e.title)}\n</td>
        <td > ${filmsJson.map((e) => e.image)}\n</td>
        </tr>
      </table></body>
      </html>`,
          (err) => {
            if (err) throw err;
            console.log("Saved!");
          }
        );
      }
    });
    response.write(`<a href=${"./mynewfile3.html"}>dar</a>`);
    response.end(console.log("error"));
  })
  .listen(3002);
