const http = require("http");
const https = require("https");
const EventEmitter = require("events");
const fs = require("fs");
const filmEmitter = new EventEmitter();
const file = `${__dirname}/films.html`;
const peoplefile = `${__dirname}/people.html`;

filmEmitter.on("films", () => {
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
          <th>Numbers</th>
          <th>Name</th>
          <th>Gender</th>
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
filmEmitter.on("people", () => {
  https.get("https://ghibliapi.herokuapp.com/people", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    res.on("end", () => {
      const convertdata = JSON.parse(Buffer.concat(data).toString());
      console.log(convertdata);
      fs.writeFile(
        "./people.html",
        JSON.stringify(`<table>
          <tr>
          <th>Numbers</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
         </tr>
         ${convertdata.map((e, i) => {
           return `<tr>
                   <td>${i + 1}</td> 
                   <td>${e.name}</td>
                   <td>${e.age}</td>
                   <td><img src=${e.gender}></td>
                   </tr>`;
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
    if (request.url.slice(8) == "films") {
      console.log(request);
      filmEmitter.emit("films");
      response.writeHead(200, { "Content-Type": "text/html" });
      return fs
        .createReadStream(file)
        .on("error", () => console.log("err"))
        .pipe(response);
    } else if (request.url.slice(8) == "people") {
      console.log("People");
      filmEmitter.emit("people");
      return fs
        .createReadStream(peoplefile)
        .on("error", () => console.log("err"))
        .pipe(response);
    }
    response.end();
  })
  .listen(3002);
