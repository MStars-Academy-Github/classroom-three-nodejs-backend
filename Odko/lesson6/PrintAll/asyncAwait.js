const printFilms = require("./printFilmsFunc");

async function printAllAsyncs() {
  await printFilms("A", () => {});
  await printFilms("B", () => {});
  await printFilms("C", () => {});
}

printAllAsyncs();
