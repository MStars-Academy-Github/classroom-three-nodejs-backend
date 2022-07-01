const https = require("https");
const fs = require("fs");
const util = require("util");

const getPeople = util.promisify(https.get);
const readFile = util.promisify(fs.readFile);

function peopleServer() {
  getPeople("https://ghibliapi.herokuapp.com/people", (res) => {
    // console.log(res);
    let data = [];
    let data2 = [];
    let people;

    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res
      .on("end", () => {
        const covertData = JSON.parse(Buffer.concat(data).toString());
        readFile("data/people.json", "utf-8")
          .then((text) => {
            people = JSON.parse(text);
          })
          .catch((err) => {
            console.log("Error", err);
          });

        people.map((a) => {
          getPeople(a.films[0], (res) => {
            res.on("data", (chunk) => {
              data2.push(chunk);
            });
            res.on("end", () => {
              const covertData1 = JSON.parse(Buffer.concat(data2).toString());
              a.images = covertData1.image;
              console.log(a);
            });
          });
        });
      })
      .catch((err) => console.log(err));
  });
}

module.exports = peopleServer;
