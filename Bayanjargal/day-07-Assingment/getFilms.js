const https = require("https");
const fs = require("fs");
const getFilms = () => {
  https
    .get("https://ghibliapi.herokuapp.com/films", (res) => {
      console.log(res.statusCode);
      let data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
      });
      res.on("end", () => {
        const convertdata = JSON.parse(Buffer.concat(data).toString());
        fs.writeFile("./data/film.json", JSON.stringify(convertdata), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        });
      });
    })
    .on("error", (err) => {
      console.error("Error %s", err.message);
    });
};

module.exports = getFilms;
