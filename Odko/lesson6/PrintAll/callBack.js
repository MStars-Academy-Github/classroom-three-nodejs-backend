const printFilms = require("./printFilmsFunc");

// daraallar ni awch baigaa a ired b,  b ired C gesen ug

function printAll() {
  printFilms("A", () => {
    printFilms("B", () => {
      printFilms("C", () => {});
    });
  });
}

printAll();
