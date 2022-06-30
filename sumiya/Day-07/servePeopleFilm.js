const https = require("https");
const fs = require("fs");
// const { url } = require("inspector");
// const http = require('http')
const filmsUrl = "https://ghibliapi.herokuapp.com/films";
const peopleUrl = "https://ghibliapi.herokuapp.com/people";

function servePeople() {
  https.get("https://ghibliapi.herokuapp.com/people", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("on", (err) => {
      console.error(err);
    });
    res.on("end", () => {
      const convertedData = JSON.parse(Buffer.concat(data).toString());
      console.log(convertedData);
      fs.writeFile("./data/Ex04.json", JSON.stringify(convertedData), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("success");
        }
      });
      console.log("end");
    });
  });
}
function serveFilms() {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("on", (err) => {
      console.error(err);
    });
    res.on("end", () => {
      const convertedData = JSON.parse(Buffer.concat(data).toString());
      fs.writeFile(
        "./data/Ex04-1.json",
        JSON.stringify(convertedData),
        (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("success");
          }
        }
      );
      console.log("end");
    });
  });
}
module.exports = serveFilms;
module.exports = servePeople;
