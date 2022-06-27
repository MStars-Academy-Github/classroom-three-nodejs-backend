let word = "something102asdfkj1948948";
let numbers = "";
let count = 0;
for (let i = 0; i < word.length; i++) {
  if (!isNaN(word.charAt(i))) {
    numbers += word.charAt(i);
    count += 1;
  }
}

console.log(word);
console.log(numbers);
console.log(count);

console.log("============");

const numberCount = word.match(/[0-9]/g || []).length;
console.log(numberCount);
