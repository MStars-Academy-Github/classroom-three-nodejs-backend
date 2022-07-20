const http = require("http");

const util = require("util");
const https = require("https");
const httpsGet = util.promisify(https.get);

const EventEmitter = require("events");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const serverEvents = new EventEmitter();

let films;

serverEvents.on("films-show", async () => {
  await readFile("./data/films.json", "utf-8")
    .then((data) => {
      films = JSON.parse(data);
    })
    .catch((err) => console.log(err));
  await readFile("./data/films.html", "utf-8")
    .then((data) => {
      let table = `
      <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
        </head>
         <body>
         <table style= "border-collapse: collapse;border: 1px solid;width: 100%">
         ${films.map((a, i) => {
           return ` <tr>
           <td>${a.title}</td>
           <td><img src=${a.image} alt="" style="width: 150px;"></td>
         </tr>`;
         })}
       </table>
         </body>
        </html>`;
      data = table;
      fs.writeFile("./data/films.html", data, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
    })
    .catch((err) => console.log(err));
});
// const filename = `${__dirname}/data/films.html`;

http
  .createServer((req, res) => {
    if (req.url === "/films/show") {
      serverEvents.emit("films-show");
    } else if (req.url === "/films/html") {
      //   fs.createReadStream(filename)
      //     .on("error", () => {
      //       console.error("error");
      //     })
      //     .pipe(filename);
    }
    res.write("hi");
    res.end();
  })
  .listen(3001);
console.log("running 3000");
