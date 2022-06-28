const https = require("https");
function printFilms(e, callback) {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    let data = [];

    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const convertedData = JSON.parse(Buffer.concat(data).toString());
      console.log(e);
      callback();
    });
  });
}

module.exports = printFilms;
