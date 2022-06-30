function convertCeil(Ceilsius) {
  let fahrenheit;
  return (fahrenheit = (Ceilsius * 9) / 5 + Ceilsius);
}

function convertFah(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

// console.log(convertCeil(32));
// console.log(convertFah(1));

module.exports = convertCeil;
module.exports = convertFah;
