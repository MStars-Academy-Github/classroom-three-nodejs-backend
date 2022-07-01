const http = require("http");
const https = require("https");
const fs = require("fs");
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
  .createServer((request, response) => {
    const tableStart = "<table>";
    const tableEnd = "</table>";
    let endResult = "";
    let result = "";
    if (request.url === "/ghibli=films") {
      fs.readFile("./data/films.json", "utf-8", (err, data) => {
        if (err) {
          console.log("error");
        } else {
          const films = JSON.parse(data);
          films.map((film, i) => {
            result += `<tr>
                        <td>${film.title}</td>
                        <td>
                        <img src=${film.image} alt="img" />
                        </td>
                        </tr>`;
          });
          endResult = tableStart + result + tableEnd;
          response.write(endResult);
        }
      });
    }
    if (request.url === "/ghibli=people") {
      fs.readFile("./data/people.json", "utf-8", (err, data) => {
        if (err) {
          console.log("error");
        } else {
          const people = JSON.parse(data);
          people.map((person, i) => {
            result += `<tr>
                        <td>${person.name}</td>
                        <td>
                        ${person.age}
                        </td>
                        <td>
                        ${person.gender}
                        </td>
                        </tr>`;
          });
          endResult = tableStart + result + tableEnd;
          response.write(endResult);
        }
      });
    }
  })
  .listen(3000);
