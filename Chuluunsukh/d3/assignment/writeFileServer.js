const fs = require("fs");

const change = {
  name: "Chuka",
  gender: "male",
  interest: "drawing",
};

fs.writeFile("./data/test.josn", change, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("success");
  }
});
