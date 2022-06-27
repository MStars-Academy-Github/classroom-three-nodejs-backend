const text = "aaweeregetaioka";
const pattern = text.replace(new RegExp("[Aa], {2,}", "s"));
const a = text.replace('"aa", "s"');
console.log("Old string %s", text);
console.log("New string %s", a);
console.log("Pattern New string %s", pattern);

// a* tsuwaa ni [2,] gewel 2 shirheg orson baiwal urgeljilne
// [Aa] tom jijg oruulsnaar bolno

// regular way

let word = "something102asdfkj1948948";
let numbers = "";
for (let i = 0; i < word.length; i++) {
  if (!isNaN(word.charAt(i))) {
    numbers += word.charAt(i);
  }
}

// regex way
let wordRegEx = "something102asdfkj1948948";
const numberCount = word.match(/[0-9]/g || []).length;

// [0-9] hed ch baij bolno ene dotorh ni

console.log(numberCount);

console.log(word);
console.log(numbers);
