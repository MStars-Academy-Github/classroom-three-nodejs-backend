const http = require("http");
const fs = require("fs");
const image = `${__dirname}/data/image/download.png`;

http
  .createServer(function (request, response) {
    response.setHeader("Content-Type", "image/png");
    fs.createReadStream(image)
      .on("error", () => console.log("err"))
      .pipe(response);
  })
  .listen(3000);
console.log("server running at http://localhost:3000");
