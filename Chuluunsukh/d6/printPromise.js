const prinFilms = require("./promisePrint");

function printAllPromise() {
  printFilms("A", () => {})
    .then(() => {
      return printFilms("B", () => {});
    })
    .then(() => {
      return printFilms("B", () => {});
    });
}

module.exports = printAllPromise;
