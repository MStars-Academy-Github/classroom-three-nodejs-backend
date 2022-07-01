const fs = require("fs");
const https = require("https");
const util = require("util");
const http = require("http");
const { resolve } = require("path");
const { rejects } = require("assert");

let people;

const getPeople = util.promisify(https.get);
const write = util.promisify(fs.writeFile);
const read = util.promisify(fs.readFile);

function createServers() {
  return new Promise((resolve, rejects) => {
    http
      .createServer((req, res) => {
        res.on("error", (err) => {
          console.error(err);
          return rejects;
        });
        res.write(` <table>
            <tr>
              <th scope="col">Numbers</th>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
            </tr>
            ${people.map((e, i) => {
              return `<tr><td>${i + 1}</td><td>${e.name}</td><td>${
                e.gender
              }</td><td><img src=${e.images}></td></tr>`;
            })}
          </table>`);
        res.end(resolve());
      })
      .listen(3004);
    console.log("running");
  });
}

async function dada() {
  await read("./data/Ex04.json", "utf-8")
    .then((data) => (people = JSON.parse(data)))
    .catch((err) => console.error(err));
  await people.map((e) => {
    getPeople(e.films[0], (res) => {
      let array = [];
      res.on("data", (chunk) => {
        array.push(chunk);
      });
      res.on("end", () => {
        const convertedData = JSON.parse(Buffer.concat(array).toString());
        // console.log(convertedData);
        e.images = convertedData.image;
        console.log(e);
      });
    }).catch((err) => {
      console.error(err);
    });
  });
  await createServers();
}

dada();
