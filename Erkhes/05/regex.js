let word = "something102asdfkj1948948";
let number = "";
for (let i = 0; i < word.length; i++) {
  if (!isNaN(word.charAt(i))) {
    number += word.charAt(i);
  }
}
// console.log(word);
// console.log(number.length);

const count = word.match(/[0-9]/g) || [];
console.log(count.length);
