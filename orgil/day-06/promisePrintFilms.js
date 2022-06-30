const https = require("https");
const request = require("request");
// const printFilms = new Promise((resolve, reject) => {
//   console.log(resolve);
//   console.log(reject);
// });

function printFilms(str, callback) {
  return new Promise((resolve, reject) => {
    https.get("https://ghibliapi.herokuapp.com/films", (result) => {
      result.on("data", (chunk) => {});
      result.on("end", (res) => {
        console.log(str);
        return resolve();
      });
      result.on("error", (error) => {
        console.log(error);
        return reject();
      });
    });
  });
}

module.exports = printFilms;
