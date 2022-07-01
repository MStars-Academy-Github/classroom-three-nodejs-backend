const https = require("https");
const fs = require("fs");
const util = require("util");

const getPeople = util.promisify(https.get);
const readFile = util.promisify(fs.readFile);
getPeople("https://ghibliapi.herokuapp.com/people", (res) => {
  let data = [];
  res.on("data", (chunk) => {
    data.push(chunk);
    res.on("end", () => {
      const convertdata = JSON.parse(Buffer.concat(data).toString());
      //   console.log(convertdata);
      fs.writeFile("./data/people.json", JSON.stringify(convertdata), (err) => {
        if (err) {
          console.log(err);
        } else {
          return data;
        }
      });
    });
  });
})
  .then((people) => {
    console.log(people);
  })
  .catch((err) => {
    console.log("Error", err);
  });
