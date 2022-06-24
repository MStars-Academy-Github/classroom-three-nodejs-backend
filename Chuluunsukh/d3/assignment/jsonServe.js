const fs = require('fs');
const FoodsJson = `${__dirname}/data/foods.json`





function servejsonFoodsFile (request, response) {
    response.setHeader("Content-type", "application/json");
    fs.createReadStream(FoodsJson)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  }


module.exports = servejsonFoodsFile