let word = "something102asdfkj1948948";
let number = "";
for (let i = 0; i < word.length; i++) {
  if (!isNaN(word.charAt(i))) {
    numbers += word.charAt(i);
  }
}
console.log(word);
console.log(numbers);

const numberCount = (word.match(/[0-9]/g) || []);
console.log(numberCount);
