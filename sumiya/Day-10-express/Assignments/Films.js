const https = require("https");
const fs = require("fs");

function serveFilms() {
  https
    .get("https://ghibliapi.herokuapp.com/films", (res) => {
      let data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
        // console.log(data);
        fs.writeFile(
          "./data/films.json",
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
        console.log(convertedData);
      });
    })
    .on("error", (err) => {
      console.error(err);
    });
}

module.exports = serveFilms;
