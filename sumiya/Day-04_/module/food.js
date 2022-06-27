const foodFile = "./food.js";
const fs = require("fs");

function serveJsonFood() {
  fs.createReadStream(foodFile).on("error", () => {
    console.error("err").pipe(res);
  });
}
module.exports = serveJsonFood;
