const https = require("https");

function printFilm(str) {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    res.on("data", (a) => {
      //   console.log(str);
    });
    res.on("end", (chunk) => {
      console.log(str);
    });
    res.on("error", () => {
      console.log("error");
    });
  });
}

module.exports = printFilm;
