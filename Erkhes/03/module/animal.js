const jsonFile = `/Users/mstars_lab3_02/Desktop/classroom-three-nodejs-backend/Erkhes/03/data/data.json`;
const fs = require("fs");
function serveAnimalJson(req, res) {
  res.setHeader("Content-type", "application/json");
  fs.createReadStream(jsonFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res);
}
module.exports = serveAnimalJson;
