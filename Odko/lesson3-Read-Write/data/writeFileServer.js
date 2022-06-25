const fs = require("fs");

const change = {
  name: "test",
  gender: "male",
  interest: "dancing",
};

fs.writeFile(
  "../assignment/data/animal.json",
  JSON.stringify(change),
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  }
);
