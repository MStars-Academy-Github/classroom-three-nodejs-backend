const http = require("http");
const fs = require("fs");

const imagefile = `${__dirname}/data/image.jpg`;
console.log(filename);

http
  .createServer(function (request, response) {
    fs.createReadStream(filename)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  })
  .listen(3003);
console.log('Server running at http://localhost"3003');
