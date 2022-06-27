const http = require("http");
const fs = require("fs");
const JsonFile = `${__dirname}/data/category.json`;

function getCategories(request, response) {
  response.setHeader("Content-Type", "application/json");

  fs.createReadStream(JsonFile)
    .on("error", () => {
      console.error("err");
      // console.log(JsonFile);
    })
    .pipe(response);
}

module.exports = getCategories;
