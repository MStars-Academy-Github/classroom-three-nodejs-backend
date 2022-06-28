const https = require("https");

function printFilms(str, callback) {
  return new Promise((resolve, reject) => {
    request("https://ghibliapi.herokuapp.com/films", (erro, response, body) => {
      if (res) {
        console.log(str);
        return reject();
      }
      res.on("end", (e) => {
        console.log(str);
        return reject();
      });
    });
  });
}

function printAllPromise() {}
