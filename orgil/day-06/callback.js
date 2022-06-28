const printFilms = require("./app");
function printAll() {
  printFilms("A", () => {
    printFilms("B", () => {
      printFilms("C", () => {});
    });
  });
}
printAll();
