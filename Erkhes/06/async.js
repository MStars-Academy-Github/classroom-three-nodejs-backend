const promiseFilms = require("./promiseFilms");

async function printAll() {
  await promiseFilms("A", () => {});
  await promiseFilms("A", () => {});
  await promiseFilms("A", () => {});
}
printAll();
