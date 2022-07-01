const http = require("http");
const fs = require("fs");
const peopleServer = require("./filmsPeople");

http
  .createServer((req, res) => {
    if (req.url.match(/^\/table/)) {
      fs.readFile("./data/films.json", "utf-8", (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        if (err) {
          console.error(err);
        } else {
          let dataJson = JSON.parse(data);

          res.write(
            `<table style= "border-collapse: collapse;border: 1px solid;width: 100%">
            ${dataJson.map((a, i) => {
              return ` <tr>
                <td >${1} </td>
              <td>${a.title}</td>
              <td><img src=${a.image} alt="" style="width: 150px;"></td>
            </tr>`;
            })}
          </table>`,
            (err) => {
              if (err) throw err;
              console.log("Saved!");
            }
          );
        }
        res.end();
      });
    } else if (req.url.match(/^\/ghibli=films/)) {
      fs.readFile("./data/films.json", "utf-8", (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        if (err) {
          console.error(err);
        } else {
          let dataJson = JSON.parse(data);

          res.write(
            `<table style= "border-collapse: collapse;border: 1px solid;width: 100%">
                ${dataJson.map((a, i) => {
                  return ` <tr>
                    <td >${1} </td>
                  <td>${a.title}</td>
                  <td><img src=${a.image} alt="" style="width: 150px;"></td>
                </tr>`;
                })}
              </table>`,
            (err) => {
              if (err) throw err;
              console.log("Saved!");
            }
          );
        }
        res.end();
      });
    } else if (req.url.match(/^\/ghibli=people/)) {
      if (req.method === "GET") {
        peopleServer();
        fs.readFile("./data/people.json", "utf-8", (err, data) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          if (err) {
            console.error(err);
          } else {
            let dataJson = JSON.parse(data);
            res.write(
              `<table style= "border-collapse: collapse;border: 1px solid;width: 100%">
                    ${dataJson.map((a, i) => {
                      return `<tr>
                          <td>${a.name} </td>
                          <td>${a.gender}</td>
                          <td>${a.age}</td>
                          <td><a href=${a.films[0]} >${a.films[0]}</a></td>
                        </tr>`;
                    })}
                  </table>`
            );
          }
          res.end();
        });
      }
    }
  })
  .listen(3000);
console.log("running http://localhost:3000/");
