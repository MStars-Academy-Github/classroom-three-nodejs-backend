const http = require("http");
const https = require("https");
const fs = require("fs");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const port = 3001;
let html = "";
let html1 = "";
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

eventEmitter.on("films", () => {
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
              <img src=${
                e.image
              } alt="img"  style="width:100px; height:100px" />
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
eventEmitter.on("people", async () => {
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
});

eventEmitter.on("people", () => {
  fs.readFile("./data/people.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let peoples = JSON.parse(data);

      peoples.map((people, i) => {
        html1 += `<tr style="border:1px solid black">
              <td>${i + 1}</td>
              <td>${people.name}</td>
              <td>${people.age}</td>
              
              
              <td>
              ${people.gender}
              </td>
            </tr>`;
      });
      endHtml = htmlBeg + html1 + htmlEnd;
      fs.writeFile("people.html", endHtml, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
});

http
  .createServer((req, res) => {
    if (req.url === "/ghibli=films") {
      eventEmitter.emit("films");
    } else if (req.url === "/ghibli=people") {
      eventEmitter.emit("people");
    } else {
      console.log("error");
    }
    res.end();
  })
  .listen(port);
console.log(`running ${port}`);
