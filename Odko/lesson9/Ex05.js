const http = require("http");
const util = require("util");
const https = require("https");
const httpsGet = util.promisify(https.get);
const EventEmitter = require("events");
const serverEvents = new EventEmitter();
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
let people;
let films;
const serverHTML = require("./htmlserver");
http
  .createServer((req, res) => {
    if (req.url === "/ghibli=people") {
      serverEvents.emit("people");
      peopleServer();
      //  serverHTML(req, res);
    } else if (req.url === "/ghibli=films") {
      serverEvents.emit("films");
      filmsServer();
      // serverHTML(req, res);
    }
    res.end();
  })
  .listen(3001);
console.log("running 3001");

// runnning html

function peopleServer() {
  httpsGet("https://ghibliapi.herokuapp.com/people", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const DATA = JSON.parse(Buffer.concat(data).toString());
      serverEvents.on("people", () => {
        fs.writeFile("./data/people.json", JSON.stringify(DATA), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        });
        readFile("./data/people.json", "utf-8")
          .then((data) => {
            people = JSON.parse(data);
            let table = `<table>
            ${people.map((a, i) => {
              return `  <tr>
                  <td>${a.name}</td>
                  <td>${a.age}</td>
                  <td>${a.gender}</td>
                </tr>`;
            })}
          </table>`;
            fs.writeFile("./data/people.html", table, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("success");
              }
            });
          })
          .catch((err) => console.log(err));
      });
    });
  });
}

function filmsServer() {
  httpsGet("https://ghibliapi.herokuapp.com/films", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const DATA = JSON.parse(Buffer.concat(data).toString());
      serverEvents.on("films", () => {
        fs.writeFile("./data/films.json", JSON.stringify(DATA), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        });
        readFile("./data/films.json", "utf-8")
          .then((data) => {
            films = JSON.parse(data);
            let table = `<table>
              ${films.map((a, i) => {
                return `  <tr>
                    <td>${a.title}</td>
                    <td><img src=${a.image} alt="" style="width: 150px;"></td>
                  </tr>`;
              })}
            </table>`;
            fs.writeFile("./data/films.html", table, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("success");
              }
            });
          })
          .catch((err) => console.log(err));
      });
    });
  });
}
