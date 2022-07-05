const fs = require("fs");
const http = require("http");
const servePeople = require("./servePeople");
const serveFilms = require("./serveFilms");
const port = 3000;

http
  .createServer((request, response) => {
    if (request.url === "/ghibli=films") {
      serveFilms();
      fs.readFile("./data/films.json", "utf-8", (err, datas) => {
        if (err) {
          console.error(err);
        } else {
          let filmsJsons = JSON.parse(datas);
          response.write(
            `<table style={borderStyle:"1px solid black"}>
        ${filmsJsons.map(
          (e, i) =>
            `<tr >
            <td style={border:"1px solid black"}>${i + 1}.</td>
            <td>Title: ${e.title}</td>
            <td><img src=${e.image} style={width="150px", height = "100px"} alt="Girl in a jacket"/></td>
          </tr>`
        )}
      </table>`
          );
          response.end();
        }
      });
    } else if (request.url === "/ghibli=people") {
      servePeople();
      fs.readFile("./data/Ex04.json", "utf-8", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          let hun = JSON.parse(data);
          response.write(
            `<table>
        ${hun.map(
          (e, i) =>
            `<tr style={border:1px solid black}>
            <td>${i + 1}</td>
            <td>${e.name}</td>
            <td>${e.age} </td>
            <td>${e.gender} </td>
          </tr>`
        )}
      </table>`
          );
          response.end();
        }
      });
    }
  })
  .listen(port);
console.log(`running : ${port}`);
