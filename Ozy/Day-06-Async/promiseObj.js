const https = require("https");
function printFilms(e) {
  return new Promise((resolve, reject) => {
    https.get("https://ghibliapi.herokuapp.com/films", (res) => {
      res.on("error", () => {
        return reject();
      });
      res.on("data", () => {});
      res.on("end", () => {
        console.log(e);
        return resolve();
      });
    });
  });
}
module.exports = printFilms;
