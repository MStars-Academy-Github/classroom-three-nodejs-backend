const fs = require("fs");
const jsonFile = `${__dirname}/data/category.json`;

function serveJsonFile(req, res) {
  res.setHeader("Content-Type", "application/json");
  fs.createReadStream(jsonFile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}

module.exports = serveJsonFile;
