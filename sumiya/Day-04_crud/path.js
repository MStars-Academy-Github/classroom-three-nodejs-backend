const notes = require("path");
console.log(notes.basename("./data/test.json"));
console.log(notes.dirname("./data/test.json"));
console.log(notes.extname("./data/test.json"));

console.log(notes.resolve("./data/test.json"));
console.log(notes.normalize("./data//...../test.json"));

const fs = require("fs");
fs.stat(notes.resolve("./data/test.json"), (err, stats) => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log(stats);
  }
});

// console.log(stats);
