const printFilms = require("./async/printFilmsPromise");

function promiseFilms() {
  printFilms("A", () => {})
    .then(() => {
      return printFilms("B", () => {}).then(() => {
        return printFilms("C", () => {});
      });
    })
    .catch(() => {
      console.log("happens");
    });
}
promiseFilms();
