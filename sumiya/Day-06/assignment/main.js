const convertCeil = require("./converter");
const convertFah = require("./converter");

const par = process.argv[2];
const par1 = process.argv[3];

if (par1 === "C") {
  console.log(
    par + " degree Ceilsius = " + convertCeil(par) + " degrees Fahrenheit"
  );
} else if (par1 === "F") {
  console.log(
    par + " degree fahrenheit = " + convertFah(par) + " degree Ceilsius"
  );
} else console.log("not Found function");

// console.log("================");
// console.log(
//   par + " degree Ceilsius = " + convertCeil(par) + " degrees Fahrenheit"
// );
// console.log("================");
// console.log(
//   par1 + " degree fahrenheit = " + convertFah(par1) + " degree Ceilsius"
// );
