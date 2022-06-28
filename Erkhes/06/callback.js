const printFilms = require("./printFilm.js");
function printAll() {
  printFilms("A", () => {
    printFilms("B", () => {
      printFilms("C", () => {});
    });
  });
}
printAll();
