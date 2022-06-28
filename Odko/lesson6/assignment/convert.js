// garaas ogch baigaa utga
const input = process.argv[2];

// C = (F - 32) % 18
function Celsius(input) {
  return (input - 32) / 1.8;
}

// (C * 1.8) + 32 = F
function Fahrenheit(c) {
  return c * 1.8 + 32;
}

module.exports = Fahrenheit;
module.exports = Celsius;
