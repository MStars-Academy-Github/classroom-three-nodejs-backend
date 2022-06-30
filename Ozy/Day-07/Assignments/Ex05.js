const http = require("http");
const fs = require("fs");
const https = require("https");

function getImage(url) {
  https
    .get(url, (res) => {
      res.on("data", (chunk) => {
        fs.writeFile("./data/image.json", chunk, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("success");
          }
        });
      });
      res.on("end", () => {});
    })
    .on("error", (err) => {
      console.error(err);
    });
}

http
  .createServer(function (request, response) {
    if (request.url === "/ghibli=people") {
      fs.readFile("./data/people.json", "utf-8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        } else {
          let people = JSON.parse(data);

          response.write(
            ` <table>
                <tr>
                  <th scope="col">Numbers</th>
                  <th scope="col">Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Age</th>
                </tr>
              
                ${people.map(
                  (e, i) =>
                    ` <tr><td>${i + 1}</td><td>${e.name}</td><td>${
                      e.gender
                    }</td><td>${e.age}</td> <td>${getImage(e.films)}</td> </tr>`
                )}
               
              </table>`
          );
          response.end();
        }
      });
    }
  })
  .listen(3000);
console.log("Running");
