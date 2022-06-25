const fs = require("fs");

const petsArray = ["dog", "cat", "bird", "monkey"];

console.log(petsArray);
console.table(petsArray);
console.assert(petsArray.length > 5);

console.log("My %s has %d years", "cat", 2);

// %s string %d is number %i integer, %o is object

const path = require("path");

// yerunhi hesgig zaaj ogch baina
console.log(path.dirname("./data/test.json"));

// ogson nerig ogch baina
console.log(path.basename("./data/test.json"));

// file n nerig ogch baina
console.log(path.extname("./data/test.json"));

// full path zaaj ogch baina
console.log(path.resolve("./data/test.json"));

fs.stat(path.resolve("./data/test.json"), (err, stats) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(stats);
  }
});
