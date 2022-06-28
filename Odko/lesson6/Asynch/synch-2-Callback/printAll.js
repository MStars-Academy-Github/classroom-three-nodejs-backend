const printFilm = require("./funcPrint");

function printAll() {
  printFilm("A", () => {
    printFilm("B", () => {
      printFilm("C", () => {});
    });
  });
}

printAll();
