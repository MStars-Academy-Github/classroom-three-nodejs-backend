const text = "aawerwerweyas";
const a = text.replace("aa", "s");
const pattern = text.replace(new RegExp("[aa],{2,}", "s"));
// console.log(text);
// console.log(a);
// console.log(pattern);

let word = "something102asdfkj1948948";
let numbers = "";

const numberCount = (word.match(/[0-9]/g) || []).length;

for (let i = 0; i < word.length; i++) {
  if (!isNaN(word.charAt(i))) {
    numbers += word.charAt(i);
  }
}

console.log(numberCount);
