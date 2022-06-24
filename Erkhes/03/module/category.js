const catFile =
  "/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/03/data/category.json";
const fs = require("fs");
console.log(catFile);
function serveCatJson(req, res) {
  res.setHeader("Content-type", "application/json");
  fs.createReadStream(catFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);
}
module.exports = serveCatJson;
