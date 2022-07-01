const https = require("https");

function printFilms(str, callback) {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    res.on("data", (a) => {});
    res.on("end", (result) => {});
    console.log(str);
    callback();
  });
}

module.exports = printFilms;