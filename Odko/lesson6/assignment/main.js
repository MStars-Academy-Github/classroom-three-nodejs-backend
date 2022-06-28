const Celsius = require("./convert");
const Fahrenheit = require("./convert");

const input = process.argv[2];
const input1 = process.argv[3];

// const ccc = Celsius(input);
// console.log(ccc);
// console.log(Fahrenheit(ccc));
let C = Celsius(input);
if (input1 === "f") {
  console.log(C);
} else {
  console.log(Fahrenheit(C));
}

// running 'node main.js 101,5 f'
