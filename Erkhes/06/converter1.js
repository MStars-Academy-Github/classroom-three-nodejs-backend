function fahToCel(a) {
  const cel = ((parseInt(a) - 32) * 5) / 9;
  console.log(`${a} Fahrenheit is ${cel} Celsius`);
}
module.exports = fahToCel;
