const http = require("http");
const fs = require("fs");
const https = require("https");
const util = require("util");

let convertedData;
let people;

const readFile = util.promisify(fs.readFile);
const httpsGet = util.promisify(https.get);

readFile("./data/people.json", "utf-8")
  .then((text) => (people = JSON.parse(text)))
  .catch((err) => console.error(err));

http
  .createServer((request, response) => {
    response.write(` <table>
      <tr>
        <th scope="col">Numbers</th>
        <th scope="col">Name</th>
        <th scope="col">Gender</th>
      </tr>

      ${people.map(
        (e, i) =>
          ` <tr><td>${i + 1}</td><td>${e.name}</td><td>${
            e.gender
          }</td><td><img src=${httpsGet(`${e.films}`, (res) => {
            res.on("data", (chunk) => {
              debugger;
              return `${chunk.image}`;
            });
          }).catch((err) => {
            console.error(err);
          })}></td> </tr>`
      )}

    </table>`);
    response.end("End");
  })
  .listen(3000);
console.log("Running");
