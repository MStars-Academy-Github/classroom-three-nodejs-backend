var file = require("fs");

const foods = `${__dirname}/../jsonData/foods.json`;

function serverFood(request, response) {
  response.setHeader("Content-Type", "application/json");
  file
    .createReadStream(foods)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}

module.exports = serverFood;
