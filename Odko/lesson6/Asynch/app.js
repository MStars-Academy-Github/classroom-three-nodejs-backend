const https = require("https");

function printFilms(str, callback) {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    res.on("data", (a) => {
      //   console.log(str);
    });

    res.on("end", (chunk) => {
      console.log(str);
      callback();
    });
  });
}

module.exports = printFilms;
