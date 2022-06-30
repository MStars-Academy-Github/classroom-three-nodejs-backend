const printFilm = require("./printFunc");

function printAll() {
  printFilm("A", () => {})
    .then(() => {
      return printFilm("B", () => {});
    })
    .then(() => {
      return printFilm("C", () => {});
    })
    .catch("promise");
}

printAll();
