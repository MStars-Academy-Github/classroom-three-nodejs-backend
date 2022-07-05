const http = require("http");
const https = require("https");
const EventEmitter = require("events");
const fs = require("fs");
const url = require("url");
const eventEmitter = new EventEmitter();
const tableStart = "<table>";
const tableEnd = "</table>";
let endResult = "";
let result = "";
fs.readFile("./data/people.json", "utf-8", (err, data) => {
  if (JSON.parse(data).length < 1) {
    https.get("https://ghibliapi.herokuapp.com/people ", async (res) => {
      let data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
        fs.writeFile(
          "./data/people.json",
          Buffer.concat(data).toString(),
          (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("success");
            }
          }
        );
      });
      res.on("end", () => {
        convertedData = Buffer.concat(data).toString();
      });
    });
  }
});
fs.readFile("./data/films.json", "utf-8", (err, data) => {
  if (JSON.parse(data).length < 1) {
    https.get("https://ghibliapi.herokuapp.com/films ", async (res) => {
      let data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
        fs.writeFile(
          "./data/films.json",
          Buffer.concat(data).toString(),
          (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("success");
            }
          }
        );
      });
      res.on("end", () => {
        convertedData = Buffer.concat(data).toString();
      });
    });
  }
});
eventEmitter.on("films", async () => {
  fs.readFile("./data/films.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error on films-show");
    } else if (JSON.parse(data).length > 0) {
      const films = JSON.parse(data);
      films.map((film, i) => {
        result += `
        <tr>
            <td>${i + 1}</td>
            <td>${film.title}</td>
            <td>
            <img src=${film.image} alt="img" />
            </td>
         </tr>`;
      });
      endResult = tableStart + result + tableEnd;
      fs.writeFile("./films.html", endResult, (err) => {
        if (err) {
          console.log("error on writing html");
        }
      });
    }
  });
});
eventEmitter.on("people", async () => {
  fs.readFile("./data/people.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error on reading people");
    } else {
      const people = JSON.parse(data);
      people.map((person, i) => {
        result += `
        <tr>
            <td>${i + 1}</td>
            <td>${person.name}</td>
            <td>
            <td>${person.age}</td>
            </td>
            <td>
            <td>${person.gender}</td>
            </td>
         </tr>`;
      });
      endResult = tableStart + result + tableEnd;
      fs.writeFile("./people.html", endResult, (err) => {
        if (err) {
          console.log("error on writing html");
        }
      });
    }
  });
});
http
  .createServer((request, response) => {
    console.log(request.url.slice(8));
    if (request.url.slice(8) == "films") {
      eventEmitter.emit("films");
      //   response.end("check films.html");
    } else if (request.url.slice(8) == "people") {
      eventEmitter.emit("people");
    }
    response.end();
  })
  .listen(3002);
