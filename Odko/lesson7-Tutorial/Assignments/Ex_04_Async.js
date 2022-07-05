const http = require("http");
const fs = require("fs");
const https = require("https");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const httpsGet = util.promisify(https.get);
let people;

new Promise((resolve, rejects) => {
  personServer();
  http
    .createServer((req, res) => {
      res.on("error", () => {
        return rejects();
      });
      res.write(`<table>
        ${people.map((e, i) => {
          return `<tr><td>${i + 1}</td><td>${e.name}</td><td>${
            e.gender
          }</td><td><img src=${e.images}></td></tr>`;
        })}
      </table>`);
      res.end(resolve());
    })
    .listen(3000);
  console.log("running server localhost:3000");
});

async function personServer() {
  await readFile("./data/people.json", "utf-8")
    .then((data) => (people = JSON.parse(data)))
    .catch((err) => console.log(err));

  await people.map((image) => {
    httpsGet(image.films[0], (res) => {
      const data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
      });
      res.on("end", () => {
        const covertData = JSON.parse(Buffer.concat(data).toString());
        image.images = covertData.image;
      });
    }).catch((err) => console.error(err));
  });
}
