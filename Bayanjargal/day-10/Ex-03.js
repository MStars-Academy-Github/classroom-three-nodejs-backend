const http = require("http");
const https = require("https");
const EventEmitter = require("events");
const fs = require("fs");
const filmEmitter = new EventEmitter();
const file = `${__dirname}/films.html`;

filmEmitter.on("show", (message) => {
  https.get("https://ghibliapi.herokuapp.com/films", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const convertdata = JSON.parse(Buffer.concat(data).toString());
      console.log(convertdata);
      fs.writeFile(
        "./films.html",
        JSON.stringify(`<table>
        <tr>
        <th scope="col">Numbers</th>
        <th scope="col">Name</th>
        <th scope="col">Gender</th>
       </tr>
       ${convertdata.map((e, i) => {
         return `<tr><td>${i + 1}</td><td>${e.title}</td><td>${
           e.director
         }</td><td><img src=${e.image}></td></tr>`;
       })}
       </table>`),
        (err) => {
          if (err) {
            console.log("err");
          } else {
            console.log("success");
          }
        }
      );
    });
  });
});

http
  .createServer((request, response) => {
    if (request.url == "/films/show") {
      console.log("show");
      filmEmitter.emit("show");
      response.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream(file)
        .on("error", () => console.log("err"))
        .pipe(response);
    }
    response.end();
  })
  .listen(3002);
