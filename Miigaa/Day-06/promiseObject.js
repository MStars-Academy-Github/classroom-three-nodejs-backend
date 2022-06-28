const https = require("https");

function printFilms(str, callback) {
  return new Promise((resolve, reject) => {
    https.get("https://ghibliapi.herokuapp.com/films", (res) => {
      res.on("data", (a) => {
        return resolve();
      });
      res.on("end", (result) => {
        console.log(str);
        return resolve();
      });
      res.on("error", (err) => {
        return reject();
      });
    });
  });
}

module.exports = printFilms;
