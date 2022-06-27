let word = "something123asd1234567";
let numbers = "";

for (let i = 0; i < word.length; i++) {
  if (!isNaN(word.charAt(i))) {
    numbers += word.charAt(i);
  }
}
console.log(word);
console.log(numbers);

const numberCount = word.match(/[0-9]/g || []).length;
console.log(numberCount);
