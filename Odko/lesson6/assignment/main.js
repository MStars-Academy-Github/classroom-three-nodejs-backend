const Celsius = require("./convert");
const Fahrenheit = require("./convert");

const input = process.argv[2];
const input1 = process.argv[3];

// const ccc = Celsius(input);
// console.log(ccc);
// console.log(Fahrenheit(ccc));

if (input1.match(`/f`)) {
  console.log(Celsius(input));
} else {
  console.log(Fahrenheit(input));
}
