const https = require("https");
const util = require("util");
const fs = require("fs");

const getPeople = util.promisify(https.get);
const getFile = util.promisify(fs.readFile);

https
  .createServer(async (request, response) => {
    const people = await readFile("./data/people.json", "utf-8");
    const peopleArray = JSON.parse(people);
    peopleArray.map(async (e) => {
      let filmObject = e;
      const p = await httpsGet(e.films[0], (res) => {
        let data = [];
        res.on("data", (chunk) => {
          data.push(chunk);
        });
        res.on("end", () => {
          const convertData = JSON.parse(Buffer.concat(data).toString());
        });
      });
    });

    getPeople("https://ghibliapi.herokuapp.com/films", (res) => {
      fs.readFile("data/people.json", "utf-8", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          data = convertData;
          fs.writeFile("./data/people.json", JSON.stringify(data), (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("success");
            }
          });
        }
      });
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });
