const https = require("https");

// fetch("https://ghibliapi.herokuapp.com/films");

function printFilms(str, callback) {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    res.on("data", (d) => {
      //   console.log(str);
    });
    res.on("end", (e) => {
      console.log(str);
      callback();
    });
  });
}

module.exports = printFilms;
