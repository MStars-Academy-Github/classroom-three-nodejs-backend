const fs = require("fs");
const https = require("https");
const util = require("util");
const http = require("http");
const { resolve } = require("path");
const { rejects } = require("assert");

let people;

const getPeople = util.promisify(https.get);
const read = util.promisify(fs.readFile);

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
        // console.log(e);
      });
    }).catch((err) => {
      console.error(err);
    });
  });
  await http
      .createServer((req, res) => {
        res.on("error", (err) => {
          console.error(err);
          return rejects;
        });
        res.write(`<table>
            <tr>
              <th scope="col">No</th>
              <th scope="col">name</th>
              <th scope="col">gender</th>
            </tr>
            ${ people.map((e, i) => {
              return `<tr><td>${i + 1}.</td><td>Name: ${e.name}</td><td>Gender: ${
                e.gender
              }</td><td> <img src=${e.images} style={width="150px", height = "100px"}></td></tr>`;
            })}
          </table>`);
        res.end(resolve());
      })
      .listen(3004);
    console.log("running");
}


dada()