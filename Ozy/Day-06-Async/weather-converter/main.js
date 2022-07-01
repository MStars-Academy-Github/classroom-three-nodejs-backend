const ConverterCtoF = require("./ConverterCtoF");
const ConverterFtoC = require("./ConverterFtoC");
const value = process.argv[2];
// ConverterCtoF(value);
// ConverterFtoC(value);
let CorF = process.argv[3];

if (CorF.match(/[Ff]/)) {
  ConverterCtoF(value);
} else {
  ConverterFtoC(value);
}
