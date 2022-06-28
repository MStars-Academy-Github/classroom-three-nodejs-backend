let word = "somethingasdfkj";
let numbers = "";
for (let i = 0; i < word.length; i++) {
  if (!isNaN(word.charAt(i))) {
    numbers += word.charAt(i);
  }
}
// console.log(numbers.length);

const numbersCount = (word.match(/[0-9]/g) || []).length;
console.log(numbersCount);
