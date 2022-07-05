const http = require("http");
const https = require("https");
const fs = require("fs");
const eventEmitter = require("events");
const filmEmitter = new eventEmitter();

http
  .createServer((request, response) => {
    if (request.url === "/") {
      response.end("<h1>It is root</h1>");
    } else if (request.url === "/films") {
      console.log(request.url);
      filmEmitter.emit("films");
      response.end("films");
    } else {
      response.end("Not Found");
    }
  })
  .listen(3001);

filmEmitter.on("films", () => {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    console.log(res.statusCode);
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const convertedData = JSON.parse(Buffer.concat(data).toString());
      fs.writeFile(
        "./data/films.json",
        JSON.stringify(convertedData),
        (err) => {
          if (err) {
            console.err(err);
          }
        }
      );
    });
  });
});
