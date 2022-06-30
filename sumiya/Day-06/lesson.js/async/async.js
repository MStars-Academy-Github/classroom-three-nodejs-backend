const printFilms = require("./printFilmsPromise");

async function printAllAsync() {
  await printFilms("A", () => {});
  await printFilms("B", () => {});
  await printFilms("C", () => {});
}

printAllAsync();
