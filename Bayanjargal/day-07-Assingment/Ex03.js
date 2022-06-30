const http = require("http");
const films = require("./getFilms");
const https = require("https");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      https
        .get("https://ghibliapi.herokuapp.com/films", (res) => {
          console.log(res.statusCode);
          let data = [];
          res.on("data", (chunk) => {
            data.push(chunk);
          });
          res.on("end", () => {
            const convertdata = JSON.parse(Buffer.concat(data).toString());
            let datanameandimage = [];
            let title = convertdata.map((a) => {
              return a.title;
            });
            let imageData = convertdata.map((i) => {
              return i.image;
            });
            console.log(title);
            console.log(imageData);

            // fs.writeFile(
            //   "./data/film.json",
            //   JSON.stringify(convertdata),
            //   (err) => {
            //     if (err) {
            //       console.log(err);
            //     } else {
            //       console.log("success");
            //     }
            //   }
            // );
          });
        })
        .on("error", (err) => {
          console.error("Error %s", err.message);
        });
      res.end(`<table><tr><th>Title</th><th>Image</th></tr></table>`);
    }
  })
  .listen(3002);
