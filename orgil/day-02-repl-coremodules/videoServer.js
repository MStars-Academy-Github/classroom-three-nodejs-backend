const http = require("http");
const fs = require("fs");

const filename = `${__dirname}/data/cweamy.mp4`;
console.log(filename);

http
  .createServer((request, response) => {
    response.setHeader("Content-Type", "video/mp4");
    fs.createReadStream(filename)
      .on("error", () => {
        console.error("error");
      })
      .pipe(response);
  })
  .listen(3000);
console.log("Server running at https://localhost:3000");
