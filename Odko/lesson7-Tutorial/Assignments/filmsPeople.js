const https = require("https");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const httpsGet = util.promisify(https.get);
let people;

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
      fs.writeFile("./data/peopleHttps.json", JSON.stringify(people), (err) => {
        if (err) {
          console.error(err);
          return;
        } else {
          console.log("success");
        }
      });
    }).catch((err) => console.error(err));
  });
}

module.exports = personServer;
