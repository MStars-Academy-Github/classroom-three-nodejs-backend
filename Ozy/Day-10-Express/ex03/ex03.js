const http = require("http");
const EventEmitter = require("events");
const fs = require("fs");
const eventEmitter = new EventEmitter();

eventEmitter.on("films", () => {
  fs.readFile("../data/films.json", "utf-8", (err, data) => {
    const films = JSON.parse(data);
    if (err) {
      console.error(err);
    } else {
      const tableOfFilms = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
        <table><tr><th>${films.map(
          (e, i) =>
            `<tr><td>${i + 1}</td><td>${e.title}</td><td><img src=${
              e.image
            }></td> </tr>`
        )}}</th></tr></table></body>
      </html>`;
      fs.writeFile("./public/films.html", tableOfFilms, (err) => {
        console.error(err);
      });
    }
  });
});
http
  .createServer((request, response) => {
    if (request.url === "/films/show") {
      eventEmitter.emit("films");
      console.log("Success");
    }
    response.end();
  })
  .listen(3002);
console.log("Running");
