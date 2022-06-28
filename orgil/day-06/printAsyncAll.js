const printFilms = require("./promisePrintFilms");

async function printAllAsync() {
  await printFilms("A", () => {});
  await printFilms("B", () => {});
  await printFilms("C", () => {});
}

printAllAsync();
