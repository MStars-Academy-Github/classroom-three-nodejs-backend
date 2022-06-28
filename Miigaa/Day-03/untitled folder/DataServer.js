
const fs = require("fs");
const JsonFile = `${__dirname}/data/test.json`;

function jsonServerFile(req, res) {
  res.setHeader("Content-Type", "application/json");
  fs.createReadStream(JsonFile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}
module.exports = jsonServerFile