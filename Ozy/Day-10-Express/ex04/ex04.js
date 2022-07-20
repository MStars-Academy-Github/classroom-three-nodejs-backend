const http = require("http");
const EventEmitter = require("events");
const fs = require("fs");
const https = require("https");
const eventEmitter = new EventEmitter();

eventEmitter.on("people", () => {
  https.get("https://ghibliapi.herokuapp.com/people", (res) => {
    let arr = [];
    res.on("data", (chunk) => {
      arr.push(chunk);
    });
    res.on("error", (err) => console.error(err));
    res.on("end", () => {
      fs.writeFile(
        "../data/people.json",
        Buffer.concat(arr).toString(),
        (err) => {
          console.error(err);
        }
      );
    });
  });
  fs.readFile("../data/people.json", "utf-8", (err, data) => {
    const people = JSON.parse(data);
    if (err) {
      console.error(err);
    } else {
      const tableOfPeople = `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
          </head>
          <body>
          <table><tr><th>${people.map(
            (e, i) =>
              `<tr><td>${i + 1}</td><td>${e.name}</td><td>${
                e.gender
              }</td> </tr>`
          )}}</th></tr></table></body>
        </html>`;
      fs.writeFile("./public/people.html", tableOfPeople, (err) => {
        console.error(err);
      });
    }
  });
});

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
    if (request.url === "/ghibli=films") {
      eventEmitter.emit("films");
      console.log("Success");
    } else if (request.url === "/ghibli=people") {
      eventEmitter.emit("people");
      console.log("Success");
    }
    response.end();
  })
  .listen(3000);
console.log("Running");
