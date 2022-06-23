const http = require("http");
const fs = require("fs");

const filename = `${__dirname}/data/data.json`;
console.log(filename);

let about = { name: "Chuka", gender: "male", interest: "drawing" };

http
  .createServer(function (request, response) {
    fs.createReadStream(filename)
      .on("error", () => {
        console.log("error");
      })
      .pipe(response);
  })
  .listen(3000);
console.log('Server running at http://localhost"3002');
