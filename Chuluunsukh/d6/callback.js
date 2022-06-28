const printFilms = require("./app");

function printAllCallBack() {
  printFilms("A", () => {
    printFilms("B", () => {
      printFilms("C", () => {});
    });
  });
}

printAllCallBack();
