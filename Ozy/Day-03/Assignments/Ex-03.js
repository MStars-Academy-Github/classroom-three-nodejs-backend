const http = require("http");
const fs = require("fs");

const JsonFile = `${__dirname}/data/categories.json`;

http
  .createServer(function (request, response) {
    if(request.url === "/api/categories"){
    response.setHeader("Content-Type", "application/json")

        fs.createReadStream(JsonFile)
        .on("error", () => {
          console.error("err");
        })
        .pipe(response);}else(response.end("not found"))

  })
  .listen(3000);
console.log("Server running at http://localhost:3000");
