const fs = require("fs");
function readCat(req, res) {
  res.setHeader("Content-type", "application/json");
  fs.createReadStream("../data/category.json")
    .on("error", (err) => {
      console.log(err);
    })
    .pipe(res);
}
module.exports = readCat;
