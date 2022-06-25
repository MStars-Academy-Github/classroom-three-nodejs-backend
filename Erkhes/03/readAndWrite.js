const fs = require("fs");

fs.readFile("./data/data.json", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
    fs.writeFile("./data/write.json", data, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("success");
      }
    });
  }
});
