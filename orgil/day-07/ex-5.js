const fs = require("fs");
const https = require("https");
const util = require("util");
const http = require("http");
const getPeople = util.promisify(https.get);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
let answer;

http
  .createServer(async (req, res) => {
    const people = await getPeople(
      "https://ghibliapi.herokuapp.com/people",
      (result) => {
        let data = [];
        result.on("data", (chunk) => {
          data.push(chunk);
        });
        result.on("end", async () => {
          const convertedData = JSON.parse(Buffer.concat(data).toString());
          //   console.log(convertedData);
          answer = convertedData;
          await writeFile(
            "./data/ex-5-data.json",
            JSON.stringify(convertedData),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        });
        res.end("Ending..1");
        return console.log("sda");
      }
    )
      .then((data) => {
        console.log(data);
        console.log("this is data");
        res.end("Ending..2");
      })
      .catch((err) => {
        console.log("this is error");
        console.log(err);
        res.end("Ending..3");
      });
    // console.log(people);
    res.end("Ending..4");
  })
  .listen(3004);
