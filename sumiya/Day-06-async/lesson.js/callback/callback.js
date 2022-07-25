const printFilms = require("./print");

function callback() {
  printFilms("a", () => {
    printFilms("b", () => {
      printFilms("c", () => {});
    });
  });
}

callback();
