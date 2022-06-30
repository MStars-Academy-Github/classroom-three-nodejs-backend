const http = require("http");
const https = require("https");
const fs = require("fs");

https
  .get("https://ghibliapi.herokuapp.com/people", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
      fs.writeFile(
        "./data/people.json",
        Buffer.concat(data).toString(),
        (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("success");
          }
        }
      );
    });
    res.on("end", () => {
      convertedData = Buffer.concat(data).toString();
    });
  })
  .on("error", (err) => {
    console.error(err);
  });

http
  .createServer(function (request, response) {
    if (request.url === "/ghibli=films") {
      fs.readFile("./data/films.json", "utf-8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        } else {
          let films = JSON.parse(data);
          response.write(
            ` <table>
                  <tr>
                    <th scope="col">Numbers</th>
                    <th scope="col">Titles</th>
                    <th scope="col">Images</th>
                  </tr>
                  
                 
                  ${films.map(
                    (e, i) =>
                      ` <tr><td>${i + 1}</td><td>${e.title}</td><td><img src=${
                        e.image
                      }></td> </tr>`
                  )}
                 
                </table>`
          );
          response.end();
        }
      });
    } else if (request.url === "/ghibli=people") {
      fs.readFile("./data/people.json", "utf-8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        } else {
          let people = JSON.parse(data);
          console.log(people);
          response.write(
            ` <table>
                    <tr>
                      <th scope="col">Numbers</th>
                      <th scope="col">Name</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Eye Color</th>
                    </tr>
                    
                   
                    ${people.map(
                      (e, i) =>
                        ` <tr><td>${i + 1}</td><td>${e.name}</td><td>${
                          e.gender
                        }</td><td>${e.eye_color}</td> </tr>`
                    )}
                   
                  </table>`
          );
          response.end();
        }
      });
    }
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");
