const addFunc = require("./add");

const a = Number(process.argv[2]);

const b = Number(process.argv[3]);

console.log(Number(a));
console.log(Number(b));

console.log(addFunc(a, b));
