const https = require("https");

function printFilm(str, callback) {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    res.on("data", (a) => {
      // console.log(a);
    });
    res.on("end", (chunk) => {
      console.log(str);
      callback();
    });
  });
}

module.exports = printFilm;
