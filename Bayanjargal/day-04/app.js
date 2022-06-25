let initailMemory = process.memoryUsage().heapUsed;
let word = process.argv[2];

console.log(`Your word is ${word}`);

let wordArray = [];

for (let i = 0; i < 100; i++) {
  wordArray.push(`${word} count : ${i}`);
}

console.log(
  `Starting memory usage : ${initailMemory}. \nCurrent memory usage:${
    process.memoryUsage().heapUsed
  }.\nAfter using the loop to add elements to the array , the process is using ${
    (initailMemory / process.memoryUsage().heapUsed) * 100
  } more bytes of memory`
);
