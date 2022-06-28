const https = require("https");
function promiseFilm(str, callback) {
  return new Promise((resolve, reject) => {
    https.get("https://ghibliapi.herokuapp.com/films", (res) => {
      // console.log(res.statusCode);
      res.on("data", (d) => {});
      res.on("end", (result) => {
        console.log(str);
        return resolve();
      });
      res.on("error", (res) => {
        console.log("error");
        return reject();
      });
    });
  });
}

module.exports = promiseFilm;
