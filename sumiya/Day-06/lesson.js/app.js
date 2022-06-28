const printFilms = require("./callback/print");

function printAll() {
  printFilms("a");
  printFilms("b");
  printFilms("c");
}

console.log(printAll());
