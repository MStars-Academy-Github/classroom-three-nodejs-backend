const printFilms = require("./promiseObject");

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
