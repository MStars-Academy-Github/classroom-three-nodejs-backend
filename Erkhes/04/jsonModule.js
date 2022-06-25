const fs = require("fs");
const jsonFile = `/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/04/data/data.json`;

function serveJson(req, res) {
  res.setHeader("Content-type", "application/json");
  fs.createReadStream(jsonFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);
}
module.exports = serveJson;
