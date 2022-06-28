const promiseFilm = require("./makePromise");
function printAll() {
  promiseFilm("A", () => {})
    .then(() => {
      return promiseFilm("B", () => {});
    })
    .then(() => {
      return promiseFilm("C", () => {});
    });
}
printAll();
