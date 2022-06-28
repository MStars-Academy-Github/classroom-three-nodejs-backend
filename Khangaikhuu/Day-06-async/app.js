const https = require("https");

function printFilms(str) {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    res.on("data", (a) => {
      //   console.log(str);
    });

    res.on("end", (result) => {
      console.log(str);
    });
  });
}

module.exports = printFilms;
