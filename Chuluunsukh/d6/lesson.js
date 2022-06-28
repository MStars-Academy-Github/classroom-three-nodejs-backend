const printFilms = require("./app");

function printAll() {
  printFilms("A");
  printFilms("B");
  printFilms("C");
  printFilms("D");
  printFilms("E");
  printFilms("F");
  printFilms("G");
}
printAll();

function printAllCallBack() {
  printFilms("A");
  printFilms("B");
  printFilms("C");
  printFilms("D");
  printFilms("E");
  printFilms("F");
  printFilms("G");
}
printAllCallBack();
