const http = require("http");
const fs = require("fs");
const imageFile = `${__dirname}/data/dog1.jpeg`;

http
  .createServer(function (request, response) {
    fs.createReadStream(imageFile)
      .on("error", () => {
        console.error("err");
      })
      .pipe(response);
    // response.writeHead(200);
    // response.setHeader("Content-type", "application/json");
    // response.write(
    //   JSON.stringify({
    //     name: "Erkhes",
    //     gender: "male",
    //     interest: "manga",
    //   })
    // );
    // response.end();
  })
  .listen(3000);
console.log("Server running at https://localhost:3000");
