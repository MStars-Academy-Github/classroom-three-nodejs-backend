const https = require("https");

function printFilms(str, callback) {
  https.get("https://ghibliapi.herokuapp.com/films", (result) => {
    result.on("data", (chunk) => {
      //   console.log(str);
    });
    result.on("end", (res) => {
      console.log(str);
      callback();
    });
  });
}

module.exports = printFilms;
