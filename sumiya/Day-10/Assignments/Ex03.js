const http = require("http");
const https = require("https");
const fs = require("fs");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const port = 3000;
let html = "";
let endHtml = "";
const htmlBeg = "<table>";
const htmlEnd = "</table>";

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
      console.error(err);
    } else {
      let film = JSON.parse(data);

      film.map((e, i) => {
        html += `<tr style="border:1px solid black">
            <td>${i + 1}</td>
            <td>${e.title}</td>
            <td>
            <img src=${e.image} alt="img"  style="width:100px; height:100px" />
            </td>
          </tr>`;
      });
      endHtml = htmlBeg + html + htmlEnd;
      fs.writeFile("films.html", endHtml, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
});

http
  .createServer((req, res) => {
    if (req.url === "/films/show") {
      eventEmitter.emit("films-show");
    }
    res.end();
  })
  .listen(port);
console.log(`running ${port}`);
