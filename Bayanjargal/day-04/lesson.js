// const petsArray = ["dog", "cat", "bird", "monkey"];

// console.log(petsArray);
// console.table(petsArray);
// console.assert(petsArray.length < 5);
// console.log("My %s has %d years", "cat", 2);

// const os = require("os");

// const local = {
//   "Home Direction": os.homedir(),
//   "Operating System": os.type(),
//   "Last Reboot": os.uptime(),
//   architecture: os.arch(),
// };

// console.log(local);

const path = require("path");
const fs = require("fs");
fs.stat("./data/test.json", (err, stats) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(stats);
});

console.log(path.basename("./data/test.json"));

console.log(path.dirname("./data/test.json"));

console.log(path.extname("./data/test.json"));

const a = path.resolve("./data/test.json");
