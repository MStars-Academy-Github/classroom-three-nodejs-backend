const http = require("http");

const util = require("util");
const https = require("https");
const httpsGet = util.promisify(https.get);

const EventEmitter = require("events");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const serverEvents = new EventEmitter();

http
  .createServer((req, res) => {
    if (req.url === "/films") {
      serverEvents.emit("films");
    }
    films();
    res.write("<h1>HI</h1>");
    res.end();
  })
  .listen(3001);
console.log("running 3000");

function films() {
  httpsGet("https://ghibliapi.herokuapp.com/films", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const DATA = JSON.parse(Buffer.concat(data).toString());
      serverEvents.on("films", () => {
        readFile("./data/films.json", "utf-8")
          .then((data) => {
            data = DATA;
            fs.writeFile("./data/films.json", JSON.stringify(data), (err) => {
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
