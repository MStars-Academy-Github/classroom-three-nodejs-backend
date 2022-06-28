const inputDigit = process.arv[2];

function celToFahr(celsius) {
  let temp = celsius;
  let fahr = (temp * 9) / 5 + 32;
  let message = temp + "\xB0C is" + fahr + "\xB0F";
  console.log(message, cels);
}

function fahrToCel(fahrenheit) {
  let ftemp = fahrenheit;
  let fToCels = ((ftemp - 32) * 5) / 9;
  let message = ftemp + "\xB0F is" + fToCels + "\xB0C";
  console.log(message);
}

(module.exports = celToFahr), fahrToCel;
