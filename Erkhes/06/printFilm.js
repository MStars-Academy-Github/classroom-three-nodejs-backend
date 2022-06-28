const https = require("https");

function printFilms(str, callback) {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    // console.log(res.statusCode);
    res.on("data", (d) => {});
    res.on("end", (result) => {
      console.log(str);
      callback();
    });
  });
}

module.exports = printFilms;
