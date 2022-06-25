const os = require("os");
const path = require("path");
const fs = require("fs");

// console.log(path.basename("./data/test.json"));
// console.log(path.dirname("./data/test.json"));
// console.log(path.extname("./data/test.json"));
// console.log(path.resolve("./data/test.json"));

fs.stat(path.resolve("./data/test.json"), (err, stats) => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log(stats);
  }
});

// const local = {
//   "Home Directory": os.homedir(),
//   "Operating System": os.type(),
//   "Last Reboot": os.uptime(),
//   architecture: os.arch(),
// };

// console.log(local);
// const petsArray = ["dog", "cat", "bird", "monkey"];

// console.table(petsArray);
// console.assert(petsArray.length > 4);

// console.log("My %s has %d years", "cat", 2);
