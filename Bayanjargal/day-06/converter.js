const convert = (numbers, c) => {
  console.log(numbers);
  if (c == "c") {
    let farenheit = numbers * 1.8 + 32 + "f";
    return farenheit;
  } else {
    return (numbers - 32) * 1.8 + "c";
  }
};

module.exports = convert;
