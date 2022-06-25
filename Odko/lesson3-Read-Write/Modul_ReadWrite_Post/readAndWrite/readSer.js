var fs = require("fs");

const asynchronReadFile = fs.readFile(
  "../jsonData/animal.json",
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
