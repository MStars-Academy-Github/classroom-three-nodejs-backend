const fs = require("fs");

const asynchronReadFile = fs.readFile(
  "../assignment/data/animal.json",
  "utf-8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log(data);
    }
  }
);

const synchronReadFile = fs.readFileSync(
  "../assignment/data/animal.json",
  "utf-8"
);

// console.log(synchronReadFile);
