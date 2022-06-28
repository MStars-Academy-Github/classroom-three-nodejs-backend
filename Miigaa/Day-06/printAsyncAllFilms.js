const printFilms = require("./promiseObject");

async function printAsyncAllFilms() {
  await printFilms("A", () => {});
  await printFilms("B", () => {});
  await printFilms("C", () => {});
}
printAsyncAllFilms();
