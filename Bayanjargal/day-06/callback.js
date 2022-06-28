const printFilms = require("./app");
const callback = () => {
  printFilms("A", () => {
    printFilms("B", () => {
      printFilms("C", () => {});
    });
  });
};

module.exports = callback;
