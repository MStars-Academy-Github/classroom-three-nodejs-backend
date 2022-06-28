const weather = require("./converter");

const a = Number(process.argv[2]);

const b = String(process.argv[3]);

console.log(Number(a));
// console.log(Number(b));

console.log(weather(a, b));
