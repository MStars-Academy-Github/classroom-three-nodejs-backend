const fs = require("fs");
const https = require("https");
const util = require("util");
const http = require("http");
const getPeople = util.promisify(https.get);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

http
  .createServer((req, res) => {
    getPeople("https://ghibliapi.herokuapp.com/people", (result) => {
      console.log(result.statusCode);
      let data = [];
      result.on("data", (chunk) => {
        data.push(chunk);
      });
    })
      .then((test) => {
        console.log(test);
      })
      .catch((err) => {
        console.log(err);
      });
    res.end("HELLO");
  })
  .listen(3004);
