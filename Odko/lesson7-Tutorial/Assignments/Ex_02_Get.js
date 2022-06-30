const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.url === "/data/films") {
      if (req.method === "GET") {
        fs.readFile(
          "https://ghibliapi.herokuapp.com/films",
          "utf-8",
          (err, data) => {
            if (err) {
              console.error(err);
            } else {
              console.log(data);
            }
          }
        );
      }
    }
    res.end("server");
  })

  .listen(3001);
console.log("running localhost:3001");
