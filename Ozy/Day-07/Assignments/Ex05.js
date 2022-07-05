const http = require("http");
const fs = require("fs");
const https = require("https");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const httpsGet = util.promisify(https.get);
let people;

function createServer() {
  return new Promise((resolve, rejects) => {
    http
      .createServer((request, response) => {
        response.on("error", () => {
          return rejects();
        });
        response.write(`<table>
            <tr>
              <th scope="col">Numbers</th>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Images</th>
            </tr>
            ${people.map((e, i) => {
              return `<tr><td>${i + 1}</td><td>${e.name}</td><td>${
                e.gender
              }</td><td><img src=${e.images}></td></tr>`;
            })}
          </table>`);
        response.end(resolve());
      })
      .listen(3000);
    console.log("Running");
  });
}

async function getDataAndCreateServer() {
  await readFile("./data/people.json", "utf-8")
    .then((data) => (people = JSON.parse(data)))
    .catch((err) => console.error(err));
  await people.map((author) => {
    httpsGet(author.films[0], (res) => {
      let arr = [];
      res.on("data", (chunk) => {
        arr.push(chunk);
      });
      res.on("end", () => {
        const convertedData = JSON.parse(Buffer.concat(arr).toString());
        author.images = convertedData.image;
      });
    }).catch((err) => console.error(err));
  });
  await createServer();
}
getDataAndCreateServer();
