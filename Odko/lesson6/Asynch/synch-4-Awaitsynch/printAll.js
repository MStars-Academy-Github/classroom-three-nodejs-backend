const printFilm = require("../synch-3-Promise/printFunc");

async function printAll() {
  await printFilm("A");
  await printFilm("B");
  await printFilm("C");
}

printAll();
