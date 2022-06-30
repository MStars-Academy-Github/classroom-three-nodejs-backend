const https = require("https");
const fs = require("fs");
const http = require("http");
const servePeople = require("./servePeopleFilm");
const serveFilms = require("./servePeopleFilm");
// const filmsUrl = "https://ghibliapi.herokuapp.com/films";
// const peopleUrl = "https://ghibliapi.herokuapp.com/people";
http
  .createServer((request, response) => {
    if (request.url === "/ghibli=films") {
      serveFilms();
      fs.readFile("./data/Ex04-1.json", "utf-8", (err, data) => {
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
      });
    } else if (request.url === "/ghibli=people") {
      servePeople();
      fs.readFile("./data/Ex04.json", "utf-8", (err, data) => {
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
            <td>${e.name}</td>
            <td>${e.age} </td>
            <td>${e.gender} </td>
          </tr>`
        )}
      </table>`,
            (err) => {
              if (err) throw err;
              console.log("Saved!");
            }
          );
        }
      });
    }
    response.end();
    // else {
    //   console.log("Not Found");
    // }
  })
  .listen(3002);
