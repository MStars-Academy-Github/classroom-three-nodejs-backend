const https = require("https");
function printFilms(e, callback) {
  return new Promise((resolve, reject) => {
    https.get("https://ghibliapi.herokuapp.com/films", (res) => {
      res.on("error", () => {
        return reject();
      });
      let data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
      });
      res.on("end", () => {
        console.log(e);
        return resolve();
      });
    });
  });
}
module.exports = printFilms;
