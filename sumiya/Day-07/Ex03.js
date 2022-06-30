const https = require("https");
const fs = require("fs");
const http = require("http");
const serveFilms = require("./serve");
const filmsUrl = "https://ghibliapi.herokuapp.com/films";
http
  .createServer((request, response) => {
    serveFilms(filmsUrl);
    fs.readFile("./data/Ex03.json", "utf-8", (err, data) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      if (err) {
        console.error(err);
      } else {
        console.log(data);
        let filmsJson = JSON.parse(data);
        console.log(filmsJson);
        response.write(
          `<table>
        ${filmsJson.map(
          (e, i) =>
            `<tr style={border:1px solid black}>
            <td>${i + 1}</td>
            <td>${e.title}</td>
            <td><img src=${e.image} alt="Girl in a jacket"/></td>
          </tr>`
        )}
      </table>`,
          (err) => {
            if (err) throw err;
            console.log("Saved!");
          }
        );
      }
      response.end();
    });
  })
  .listen(3002);
