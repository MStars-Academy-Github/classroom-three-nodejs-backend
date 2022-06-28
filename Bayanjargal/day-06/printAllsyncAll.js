const printFilms = require("./promiseFilms");
async function PrintAllAsync() {
  await printFilms("A", () => {});
  await printFilms("B", () => {});
  await printFilms("C", () => {});
}
PrintAllAsync();
