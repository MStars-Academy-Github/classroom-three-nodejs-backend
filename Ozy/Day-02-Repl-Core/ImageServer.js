const http = require("http");
const fs = require("fs");

const pic = `${__dirname}/data/pic.jpeg`;

let obj = { name: "khangai", gender: "male", interest: "music" };

http
  .createServer(function (request, response) {
    fs.createReadStream(pic)
      .on("error", () => {
        console.error("err");
      })
      .pipe(response);
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");
