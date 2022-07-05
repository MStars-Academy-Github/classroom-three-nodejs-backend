const http = require("http");
const EventEmitter = require("events");
const fs = require("fs");
const eventEmitter = new EventEmitter();

const onMessage = () => {
  fs.readFile("../data/films.json", "utf-8", (err, data) => {
    const films = JSON.parse(data);
    console.log(films);
    if (err) {
      console.error(err);
    } else {
      `<table><tr><th>${films.map(
        (e, i) =>
          ` <tr><td>${i + 1}</td><td>${e.title}</td><td><img src=${
            e.image
          }></td> </tr>`
      )}}</th></tr></table>`;
    }
  });
};
eventEmitter.on("message", onMessage);
eventEmitter.off("message", onMessage);

http
  .createServer((request, response) => {
    if (request.url === "/films/show") {
      eventEmitter.emit("message");
    }
    response.end();
  })
  .listen(3002);
console.log("Running");
