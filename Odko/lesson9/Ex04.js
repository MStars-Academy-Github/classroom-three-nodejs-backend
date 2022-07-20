const http = require("http");
const util = require("util");
const https = require("https");
const httpsGet = util.promisify(https.get);
const EventEmitter = require("events");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const serverEvents = new EventEmitter();
let people;

http
  .createServer((req, res) => {
    if (req.url === "/ghibli=people") {
      serverEvents.emit("people");
    }
    peopleServer();
    res.write("hi");
    res.end();
  })
  .listen(3001);
console.log("running 3000");

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
