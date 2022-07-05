const https = require("https");
const EventEmitter = require("events");
const fs = require("fs");
const { table } = require("console");
const eventEmitter = new EventEmitter();

eventEmitter.on("films-show", () => {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push.chunk;
      Buffer.concat(data).toString();
      fs.writeFile("./");
    });
  });
});
