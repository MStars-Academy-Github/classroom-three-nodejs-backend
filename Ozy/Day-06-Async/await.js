const printFilms = require("./promiseObj");

async function printAll() {
  await printFilms("A", () => {});
  await printFilms("B", () => {});
  await printFilms("C", () => {});
}

printAll();
