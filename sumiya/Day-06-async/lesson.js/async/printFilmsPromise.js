const https = require("https");

// fetch("https://ghibliapi.herokuapp.com/films");

function printFilms(str) {
  return new Promise((resolve, reject) => {
    https.get("https://ghibliapi.herokuapp.com/films", (res) => {
      res.on("data", (chunk) => {});
      res.on("on", (err) => {
        console.log(err);
        return reject();
      });

      res.on("end", () => {
        console.log(str);
        return resolve();
      });
    });
  });
}

module.exports = printFilms;
