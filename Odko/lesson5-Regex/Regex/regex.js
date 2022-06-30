let word = "aahfahfg4884538hdsbfsb8u5";
let numbers = "";

for (let i = 0; i < word.length; i++) {
  if (!isNaN(word.charAt(i))) {
    numbers += word.charAt(i);
  }
}

console.log(word);
console.log(numbers);
console.log(numbers.length);

// reguler expression
// number
const numberCount = (word.match(/[0-9]/g) || []).length;
console.log(numberCount);
