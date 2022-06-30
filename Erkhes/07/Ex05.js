const http = require("http");
const https = require("https");
const fs = require("fs");
let link = [];
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
function getLink() {
  fs.readFile("./data/people.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error on reading");
    } else {
      const ddata = JSON.parse(data);
      ddata.map((movie) => {
        link.push(movie.films[0]);
      });
    }
  });
  link.map((e) => {
    https
      .get(e, (res) => {
        let ddata = JSON.parse(data);
        res.on("data", (chunk) => {
          ddata.push(chunk);
          fs.writeFile(
            "./data/link.json",
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
  });
}
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
  .createServer(async (request, response) => {
    const tableStart = "<table>";
    const tableEnd = "</table>";
    let endResult = "";
    let result = "";
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
