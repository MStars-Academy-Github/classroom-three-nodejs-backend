var fs = require("fs");

const change = {
  name: "test",
  odko: "dancing",
};

fs.writeFile("../jsonData/animal.json", JSON.stringify(change), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("success");
  }
});
