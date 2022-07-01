const https = require("https");
const fs = require("fs");

function filmsServer() {
  https
    .get("https://ghibliapi.herokuapp.com/films", (res) => {
      let data = [];
      res.on("data", (chunk) => {
        data.push(chunk);
      });
      res.on("end", () => {
        const covertData = JSON.parse(Buffer.concat(data).toString());
        fs.readFile("data/films.json", "utf-8", (err, data) => {
          if (err) {
            console.error(err);
          } else {
            data = covertData;
            fs.writeFile("data/films.json", JSON.stringify(data), (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log("success");
              }
            });
          }
        });
      });
    })
    .on("error", (err) => {
      console.error("error %s", err.message);
    });
}

module.exports = filmsServer;
