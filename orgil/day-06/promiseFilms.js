const printFilms = require("./promisePrintFilms");

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
