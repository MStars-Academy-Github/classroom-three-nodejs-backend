const https = require("https");
// const callback = require("./callback");
const printFims = (a, callback) => {
  https
    .get("https://ghibliapi.herokuapp.com/films", (res) => {
      res.on("data", (chunk) => {});
      res.on("end", () => {
        console.log(a);
        callback();
      });
    })
    .on("error", (err) => {
      console.error("Error %s", err.message);
    });
};

module.exports = printFims;
