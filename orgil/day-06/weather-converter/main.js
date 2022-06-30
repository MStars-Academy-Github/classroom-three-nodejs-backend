const converter = require("./converter");

const arg = Number(process.argv[2]);
const symb = process.argv[3];

console.log(converter(arg, symb));
