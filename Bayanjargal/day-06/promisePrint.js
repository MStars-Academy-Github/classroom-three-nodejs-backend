const printFilms = require("./promiseFilms");

function printAll() {
  printFilms("A", () => {}).then(async () => {
    await printFilms("B", () => {});
    return await printFilms("C", () => {});
  });
}
printAll();
