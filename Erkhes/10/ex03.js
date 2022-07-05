const http = require("http");
const https = require("https");
const EventEmitter = require("events");
const fs = require("fs");
const eventEmitter = new EventEmitter();
const tableStart = "<table>";
const tableEnd = "</table>";
let endResult = "";
let result = "";
eventEmitter.on("films", async () => {
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
});
eventEmitter.on("films-show", () => {
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
http
  .createServer((request, response) => {
    if (request.url == "/films/show") {
      eventEmitter.emit("films-show");
      //   response.write(endResult);
    }
    response.end("check html");
  })
  .listen(3002);
