const https = require("https");
const util = require("util");
const fs = require("fs");

const getPeople = util.promisify(https.get);
const getFile = util.promisify(fs.readFile);
getPeople("https://ghibliapi.herokuapp.com/films", (res) => {
  let data = [];
  res.on("data", (chunk) => {
    data.push(chunk);
  });
  res.on("end", () => {
    const convertData = JSON.parse(Buffer.concat(data).toString());
    fs.readFile("data/people.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        data = convertData;
        fs.writeFile("./data/people.json", JSON.stringify(data), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("success");
          }
        });
      }
    });
  });
}).catch((error) => {
  console.log("Error", error);
});
