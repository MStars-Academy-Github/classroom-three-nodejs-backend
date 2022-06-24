const file = require("fs");

const filename = `${__dirname}/data/animal.json`;

function serverAnimalJson(request, response) {
  response.setHeader("Content-Type", "application/json");
  console.log(request.method);
  file
    .createReadStream(filename)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}

module.exports = serverAnimalJson;
