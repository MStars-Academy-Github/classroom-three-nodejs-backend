let initilMemory = process.memoryUsage().heapUsed;
let word = null;
// let word = process.argv[2];
console.log(`Your word is ${word}`);

let wordArray = [];

for (let i = 0; i < 1000; i++) {
  wordArray.push(`${word} count: ${i}`);
}

console.log(`starting memory usage : ${initilMemory}. 
Current memory usage:${
  process.memoryUsage().heapUsed
}. \n After using the loop to 
add element to the array, ${
  process.memoryUsage().heapUsed - initilMemory
} more bytes of memory`);
