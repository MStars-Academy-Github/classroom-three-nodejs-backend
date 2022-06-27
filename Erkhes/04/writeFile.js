const fs = require("fs");

const change = {
  name: "erkhes",
  gender: "male",
  interest: "manga",
};

fs.writeFile("./data/data.json", JSON.stringify(change), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("success");
  }
});
