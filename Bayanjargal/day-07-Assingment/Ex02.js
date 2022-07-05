const http = require("http");
const films = require("./getFilms");
http
  .createServer((request, response) => {
    if (request.url === "/") {
      return films(request, response);
    }
  })
  .listen(3001);
