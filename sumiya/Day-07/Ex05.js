const fs = require("fs");
const https = require("https");
const util = require("util");
const http = require("http");

const getPeople = util.promisify(https.get);
const write = util.promisify(fs.writeFile);
const read = util.promisify(fs.readFile);
http
  .createServer(async (req, res) => {
    let people = [];
    const peoples = await read("./data/Ex04.json", "utf-8");
    const peopleArray = JSON.parse(peoples);
    peopleArray.map(async (e) => {
      let filmObj = e;
      const p = await getPeople(e.films[0], (res) => {
        let data = [];
        res.on("data", (chunk) => {
          data.push(chunk);
        });
        res.on("end", () => {
          const convertedData = JSON.parse(Buffer.concat(data).toString());
          filmObj.images = convertedData.image;

          people.push(filmObj);

          return people;
        });
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          // console.log("error", err);
        });
      console.log(p);
    });
  })
  .listen(3000);
console.log("running");
