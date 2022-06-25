var file = require("fs");

const animal = `${__dirname}/../jsonData/animal.json`;

function serverAnimal(request, response) {
  response.setHeader("Content-Type", "application/json");
  file
    .createReadStream(animal)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}

module.exports = serverAnimal;
