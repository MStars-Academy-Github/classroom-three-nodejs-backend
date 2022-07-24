let word = "something102asdfkj1948948";
let number = "";

for (let i = 0; i < word.length; i++) {
  if (!isNaN(word.charAt(i))) {
    number += word.charAt(i);
  }
}
const numberCount = word.match(/[0-9]/g || []).length;

console.log(word);
console.log(number);
console.log(number.length);
console.log(numberCount);
