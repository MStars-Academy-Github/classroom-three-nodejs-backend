const fs = require("fs");
const http = require("http");
const https = require("https");
const util = require("util");

const get = util.promisify(https.get);
const readFile = util.promisify(fs.readFile);
const link = [];
let ddata = "";

get("https://ghibliapi.herokuapp.com/people", (res) => {
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
  .then(
    readFile("./data/people.json", "utf-8", (err, data) => {
      if (err) {
        console.log("error on reading");
      } else {
        ddata = JSON.parse(data);
        ddata &&
          ddata.map(async (movie) => {
            get(movie.films[0], (res) => {
              let newArray = [];
              res.on("data", (chunk) => {
                fs.readFile("./data/link.json", "utf-8", (err, datas) => {
                  if (err) {
                    console.log("error on reading link json");
                  } else {
                    newArray = [JSON.parse(datas)];
                    newArray.push(chunk);
                    fs.writeFile(
                      "./data/link.json",
                      Buffer.concat(newArray).toString(),
                      (err) => {
                        if (err) {
                          console.error(err);
                        } else {
                          console.log("success");
                        }
                      }
                    );
                  }
                });
              });
              // res.on("end", () => {
              //   convertedData = Buffer.concat(data).toString();
              // });
            }).catch((err) => {
              console.log("error on link");
            });
          });
      }
    })
  )
  .then(
    http
      .createServer((request, response) => {
        let linkData;
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
              fs.readFile("./data/link.json", "utf-8", (err, data) => {
                if (err) {
                  console.log("error on link read");
                } else {
                  linkData = JSON.parse(data);
                }
              });
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
      .listen(3000)
  );
