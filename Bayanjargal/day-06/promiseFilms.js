const https = require("https");

const printFilms = (str) => {
  return new Promise((resolve, reject) => {
    https
      .get("https://ghibliapi.herokuapp.com/films", (res) => {
        res.on("data", (chunk) => {});
        res.on("end", () => {
          console.log(str);
          return resolve();
        });
      })
      .on("error", (err) => {
        console.log(err);
        return reject();
      });
  });
};

module.exports = printFilms;
// const myPromise = new Promise((resolve, reject) => {
//   let condition = true;
//   if (condition) {
//     resolve("Promise is resolved");
//   } else {
//     reject("Promise is rejected");
//   }
// });
// myPromise
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((message) => {
//     console.log(message);
//   });
