const os = require("os");
const path = require("path");
const fs = require("fs");
// const pets = ["dog", "cat", "bird", "monkey"];

// console.log(pets);
// console.table(pets);
// console.assert(pets.length > 5);
// console.log("My %s has %d years", "cat", 2);

// let initialMemory = process.memoryUsage().heapUsed;
// let word = process.argv[2];

// console.log(`Your word is ${word}`);

// let wordArray = [];
// for (let i = 0; i < 1000; i++) {
//   wordArray.push(`%s count: %d`, word, i);
// }

// console.log(
//   `Starting memory usage : ${initialMemory}.
//   \n Current memory usage : ${process.memoryUsage().heapUsed} .
//   \n After using the loop to add elements to the array , the process is using ${
//     process.memoryUsage().heapUsed - initialMemory
//   } more bytes to memory .
//   \n ${(process.memoryUsage().heapUsed * 100) / initialMemory - 100}%`
// );

// const local = {
//   "Home Directory": os.homedir(),
//   "Operating System": os.type(),
//   "Last Reboot": os.uptime(),
//   architecture: os.arch(),
// };
// console.log(local);

// console.log(path.basename("./data/data.json"));
// console.log(path.dirname("./data/data.json"));
// console.log(path.extname("./data/data.json"));
// console.log(path.resolve("./data/data.json"));

fs.stat(path.resolve("./data/data.json"), (err, stats) => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log(stats);
  }
});
