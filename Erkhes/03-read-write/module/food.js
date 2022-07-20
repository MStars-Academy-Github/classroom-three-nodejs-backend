const foodFile = `/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/03/data/food.json`;
const fs = require("fs");
function serveFoodJson(req, res) {
  res.setHeader("Content-type", "application/json");
  fs.createReadStream(foodFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);
}
module.exports = serveFoodJson;
