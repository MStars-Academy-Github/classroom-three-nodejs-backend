const celToFah = require("./converter.js");
const fahToCel = require("./converter1.js");
let input = process.argv[2];
const celsius = process.argv[3];
const arg = input.replace(
  new RegExp("process.argv[2] "),
  parseInt(process.argv[2])
);
if (celsius == "F") {
  fahToCel(arg);
} else {
  celToFah(arg);
}
// const arg1 = input.replace(/process.argv[2]/[Cc]/g, parseInt(process.argv[2]));
