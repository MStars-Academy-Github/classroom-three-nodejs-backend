const arr = ["dog", "cat", "bird"];
const { fstat } = require("fs");
const os = require("os");
const fs = require("fs");

const local = {
  "Home directory": os.homedir(),
  Operating: os.type(),
  "last Reboot": os.uptime(),
};

const server = {
  type: os.type(),
  architecture: os.arch(),
  uptime: os.uptime(),
};
// console.log(os);
// console.log(local);
// console.log(server);
// console.log(arr);
// console.table(arr);
// console.assert(arr.length > 5);
console.log("My %s has %d years", "cat", 2);

// path module url gesen ug
const path = require("path");
console.log(path.basename("./data/test.json"));
console.log(path.dirname("./data/test.json"));
console.log(path.extname("./data/test.json"));
// full url
const text = path.resolve("./data/test.json");
//  fs modul
fs.stat(text, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log(stats);
  }
});

//
