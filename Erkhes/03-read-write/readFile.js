const fs = require("fs");

const asynchronReadFile = fs.readFile(
  "./data/data.json",
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
const synchronReadFile = fs.readFileSync("./data/data.json", "utf-8");
module.exports = asynchronReadFile;
