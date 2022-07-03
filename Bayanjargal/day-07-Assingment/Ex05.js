const https = require("https");
const fs = require("fs");
const util = require("util");
const http = require("http");

const getPeople = util.promisify(https.get);
const readFile = util.promisify(fs.readFile);
const httpsGet = util.promisify(https.get);
let a = "";
http
  .createServer(async (request, response) => {
    let people;
    await readFile("./data/people.json", "utf-8")
      .then((dir) => {
        people = JSON.parse(dir);
      })
      .catch((err) => {
        console.log("error", console.error(err));
      });
    await people.map((e) => {
      httpsGet(e.films[0], (res) => {
        let arr = [];
        res.on("data", (chunk) => {
          arr.push(chunk);
        });
        res.on("end", () => {
          const convertedData = JSON.parse(Buffer.concat(arr).toString());
          e.images = convertedData.image;
          console.log(e);
        });
      }).catch((err) => console.error(err));
    });
    await getPeople("https://ghibliapi.herokuapp.com/people", (res) => {
      let data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
      });
      res.on("end", () => {
        const convertdata = JSON.parse(Buffer.concat(data).toString());
        fs.writeFile(
          "./data/people.json",
          JSON.stringify(convertdata),
          (err) => {
            if (err) {
              console.log(err);
            } else {
              return console.log(convertdata);
            }
          }
        );
        response.end(`<table>
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
      });
    })
      .then((dira) => {
        console.log(dira);
        response.end("get people end");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  })
  .listen(3000);
