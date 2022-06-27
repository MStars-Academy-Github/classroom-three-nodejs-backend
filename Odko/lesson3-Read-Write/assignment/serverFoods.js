const file = require("fs");

const filename = `${__dirname}/data/foods.json`;

function serverFoodsJson(request, response) {
  response.setHeader("Content-Type", "application/json");
  file
    .createReadStream(filename)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}

module.exports = serverFoodsJson;
