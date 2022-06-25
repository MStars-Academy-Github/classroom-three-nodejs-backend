const fs = require("fs");
const JsonFile = `${__dirname}/data/test.json`;

function serverJsonFile(request, response) {
  response.setHeader("Content-Type", "application/json");
  fs.createReadStream(JsonFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(response);
}

module.exports = serverJsonFile;
