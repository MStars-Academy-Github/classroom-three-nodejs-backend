const printFilms = require("./promiseObj");

function printAllPromise() {
  printFilms("A", () => {})
    .then(() => {
      return printFilms("B", () => {});
    })
    .then(() => {
      return printFilms("C", () => {});
    });
}

printAllPromise();
