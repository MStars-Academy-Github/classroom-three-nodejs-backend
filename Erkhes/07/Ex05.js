const http = require("http");
const https = require("https");
const fs = require("fs");
let link = [];
const testArray = [];
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
            // console.log("success");
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
          console.log(chunk.image);
          ddata.push(chunk);
          testArray.push(chunk);
          fs.writeFile(
            "./data/link.json",
            Buffer.concat(ddata).toString(),
            (err) => {
              if (err) {
                console.error(err);
              } else {
                // console.log("success");
              }
            }
          );
        });
        res.on("end", () => {
          convertedData = Buffer.concat(ddata).toString();
          console.log(convertedData);
        });
      })
      .on("error", (err) => {
        console.error(err);
      });
  });
}
console.log(Buffer.concat(testArray).toString());
http
  .createServer((request, response) => {
    let linkData;
    const tableStart = "<table>";
    const tableEnd = "</table>";
    let endResult = "";
    let result = "";
    if (request.url === "/ghibli=people") {
      fs.readFile("./data/people.json", "utf-8", async (err, data) => {
        if (err) {
          console.log("error");
        } else {
          const people = JSON.parse(data);
          getLink();
          fs.readFile("./data/link.json", "utf-8", (err, data) => {
            if (err) {
              console.log("error on link read");
            } else {
              linkData = JSON.parse(data);
            }
          });
          await people.map((person, i) => {
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
