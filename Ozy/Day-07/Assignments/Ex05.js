const http = require("http");
const fs = require("fs");

http
  .createServer(function (request, response) {
    if (request.url === "/ghibli=people") {
      fs.readFile("./data/people.json", "utf-8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        } else {
          let people = JSON.parse(data);
          console.log(people[0].films);
          response.write(
            ` <table>
                <tr>
                  <th scope="col">Numbers</th>
                  <th scope="col">Name</th>
                  <th scope="col">Images</th>
                  <th scope="col">Eye color</th>
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
