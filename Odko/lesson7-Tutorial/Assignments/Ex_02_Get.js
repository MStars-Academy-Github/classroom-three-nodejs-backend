const http = require("http");
const fs = require("fs");
const filmsServer = require("./filmsServer");

http
  .createServer((req, res) => {
    if (req.url === "/data/films") {
      if (req.method === "GET") {
        filmsServer();
      }
    }
    res.end("server");
  })

  .listen(3001);
console.log("running localhost:3001");
