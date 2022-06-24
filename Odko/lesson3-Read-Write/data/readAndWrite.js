const fs = require("fs");

fs.readFile("../assignment/data/animal.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    fs.writeFile("../assignment/data/write.json", data, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });
  }
});
