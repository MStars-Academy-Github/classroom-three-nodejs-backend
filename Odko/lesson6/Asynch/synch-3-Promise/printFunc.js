const https = require("https");

function printFilm(str) {
  return new Promise((resolve, reject) => {
    https.get("https://ghibliapi.herokuapp.com/films", (res) => {
      res.on("data", (a) => {
        return resolve();
      });
      res.on("end", (chunk) => {
        console.log(str);
        return resolve();
      });
      res.on("error", () => {
        return reject();
      });
    });
  });
}

module.exports = printFilm;
