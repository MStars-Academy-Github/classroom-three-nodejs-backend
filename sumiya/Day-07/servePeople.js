const https = require("https");
const fs = require("fs");

function servePeople() {
  https
    .get("https://ghibliapi.herokuapp.com/people", (res) => {
      let data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
        fs.writeFile(
          "./data/Ex04.json",
          Buffer.concat(data).toString(),
          (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("success");
            }
          }
        );
      });
      res.on("end", () => {
        convertedData = Buffer.concat(data).toString();
      });
    })
    .on("error", (err) => {
      console.error(err);
    });
}

module.exports = servePeople;
