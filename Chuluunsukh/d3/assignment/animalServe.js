const fs = require('fs');
const AnimalJson = `${__dirname}/data/animal.json`







function serveAnimalsFile (request, response) {
    response.setHeader("Content-type", "application/json");
    fs.createReadStream(AnimalJson)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  }
  

  module.exports = serveAnimalsFile