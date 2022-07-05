// require session

// file duudaj baigaa heseg
const fs = require("fs");

// http duudaj baigaa heseg
const http = require("http");

// https duudaj bga heseg
const https = require("https");

let convertedData;

https
  .get("https://ghibliapi.herokuapp.com/films", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
      fs.writeFile(
        "./data/films.json",

        // objectig buffer hihin tuld array baih ytsoi

        Buffer.concat(data).toString(),
        (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("success");
          }
        }
      );
    });
    res.on("end", () => {
      convertedData = Buffer.concat(data).toString();
    });
  })
  .on("error", (err) => {
    console.error(err);
  });

http
  .createServer(function (request, response) {
    response.writeHead(200);
    response.write(JSON.stringify(convertedData));
    response.end();
  })
  .listen(3001);
console.log("Running at http://localhost:3001");
