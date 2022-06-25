const fs = require("fs");

const serveFile = (request, response) => {
  const fileName = `${__dirname}/public${request.url.split("/public")[1]}`;
  fs.createReadStream(fileName)
    .on("error", () => {
      response.end("Not Found");
    })
    .pipe(response);
};

module.exports = serveFile;
