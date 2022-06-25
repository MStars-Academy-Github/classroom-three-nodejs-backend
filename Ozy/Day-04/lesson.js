const path = require("path");
const os = require("os");
const fs = require("fs");

const petsArray = ["dog", "cat", "bird", "monkey"];

console.table(petsArray);
console.assert(petsArray.length > 3);
console.log("My %s has %d years", "cat", 2);

const local = {
  "Home Directory": os.homedir(),
  "Operating System": os.type(),
  "Last Reboot": os.uptime(),
  architecture: os.arch(),
};

console.log(local);

console.log(path.basename("./data/test.json"));
console.log(path.dirname("./data/test.json"));
console.log(path.extname("./data/test.json"));
console.log(path.resolve("./data/test.json"));
let url = path.resolve("./data/test.json");

fs.stat(url, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log(stats);
  }
});
