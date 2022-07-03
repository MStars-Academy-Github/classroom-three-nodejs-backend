const http = require("http");
const films = require("./getFilms");
const fs = require("fs");
const https = require("https");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      fs.readFile("./data/film.json", "utf-8", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          let imageAndTitle = JSON.parse(data);
          res.end(`<table>
          <tr>
          <td>Title</td>
          <td>Image</td>
          </tr>
         
        ${imageAndTitle.map((name, i) => {
          return `<tr><td>${i + 1}</td><td>${
            name.title
          }</td><td><img width="200px" src=${
            name.image
          } alt="title"></td></tr>`;
        })}
          </table>`);
        }
      });
    }
  })
  .listen(3002);
