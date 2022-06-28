const text = "aaaweeregetaioka";
const a = text.replace("aa", "s");
const pattern = text.replace(new RegExp("[Aa],{2,}", "s"));
console.log("Old string %s", text);
console.log("New string %s", a);
console.log("Pattern New string %s", pattern);
console.log("=======");
let word = "something102asdfkj1948948";

const numberCount = (word.match(/[0-9]/g) || []).length;
console.log(numberCount);
