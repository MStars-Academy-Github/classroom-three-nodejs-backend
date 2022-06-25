var fs = require("fs");

fs.readFile("../jsonData/animal.json", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  } else {
    fs.writeFile("../jsonData/write.json", data, (err) => {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log("success");
      }
    });
  }
});
