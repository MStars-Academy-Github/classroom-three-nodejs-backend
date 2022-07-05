const http = require("http");
const https = require("https");
const fs = require("fs");
const serveFilms = require("./Films");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const port = 3002;

http
  .createServer((req, res) => {
    const bodyT = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>`;
    const bodyEnd = `</body>
      </html>`;

    if (req.url === "/films/show") {
      eventEmitter.on("submit", () => {
        fs.readFile("./data/films.json", "utf-8", (err, data) => {
          if (err) {
            console.error(err);
          } else {
            let film = JSON.parse(data);

            fs.writeFile(
              "films.html",
              `<table>
        ${film.map(
          (e, i) =>
            `<tr style="border:1px solid black">
            <td>${i + 1}</td>
            <td>${e.title}</td>
          </tr>`
        )}
      </table>`,
              (err) => {
                console.log(err);
              }
            );
          }
        });
      });
      eventEmitter.emit("submit");
    }
    res.end();
  })
  .listen(port);
console.log(`running ${port}`);
