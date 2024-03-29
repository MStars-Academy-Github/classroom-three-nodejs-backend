const https = require("https");
function printFilms(e, callback) {
  https
    .get("https://ghibliapi.herokuapp.com/films", (res) => {
      let data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
      });
      res.on("end", () => {
        console.log(e);
        callback();
      });
    })
    .on("error", (err) => {
      console.error("Error %s"), err.message;
    });
}
module.exports = printFilms;
