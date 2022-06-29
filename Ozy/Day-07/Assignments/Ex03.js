const https = require("https");
const http = require("http");
const fs = require("fs");
const objectToTable = require("object-to-table");

let convertedData;

https
  .get("https://ghibliapi.herokuapp.com/films", (res) => {
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
      fs.writeFile(
        "./data/films.json",
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
            
            <tr>
            <tr>
            <th >${films.map((e, i) => i + 1)}</th>
          
            <th > ${films.map((e) => e.title)}</th>
            <th > ${films.map((e) => e.image)}</th>
             
            </tr>
          </table>`
        );
        response.end();
      }
    });
  })
  .listen(3002);
console.log("Server running at http://localhost:3002");
