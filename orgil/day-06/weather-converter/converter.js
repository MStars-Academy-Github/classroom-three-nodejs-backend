function converter(a, b) {
  console.log(typeof a);
  console.log(typeof b);
  if (b === "c") {
    return a + " degree Celsius = " + (a * 9) / 5 + 32 + " degrees Fahrenheit";
  } else if (b === "f") {
    return (
      a + " degree Fahrenheit = " + ((a - 32) * 5) / 9 + " degrees Celsius"
    );
  }
}

module.exports = converter;
