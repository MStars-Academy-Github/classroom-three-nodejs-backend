const http = require("http");
const fs = require("fs");
const https = require("https");
let convertedData;
let people;

function printFilms(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      res.on("error", () => {
        return reject();
      });
      let data = [];
      res.on("data", (chunk) => {
        data.push(Buffer.concat(chunk));
      });
      res.on("end", () => {
        convertedData = JSON.parse(data);
        return resolve();
      });
    });
  });
}
function getPeople() {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/people.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return reject();
      } else {
        people = JSON.parse(data);
        return resolve();
      }
    });
  });
}

function createServer() {
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
          }</td>><td></td> </tr>`
      )}
     
    </table>`);
      response.end("End");
    })
    .listen(3000);
  console.log("Running");
}

async function printAll() {
  await getPeople();
  await createServer();
}
printAll();
