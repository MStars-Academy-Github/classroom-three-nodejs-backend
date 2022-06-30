const printFilms = require("./printFilmsFunc");

// function printAll() {
//   printFilms("A");
//   printFilms("B");
//   printFilms("C");
// }

// printAll();

function printAllPromise() {
  printFilms("A", () => {})
    .then(() => {
      return printFilms("B", () => {});
    })
    .then(() => {
      return printFilms("C", () => {});
    })
    .catch("promise");
}

printAllPromise();
