const https = require("https");
const fs = require("fs");
const http = require('http')

http.createServer((request, response) => {
https.get("https://ghibliapi.herokuapp.com/films", (res) => {
  let data = [];
  res.on("data", (chunk) => {
    data.push(chunk);
  });
  res.on("on", (err) => {
    console.error(err);
  });
  res.on("end", () => {
    const convertedData = JSON.parse(Buffer.concat(data).toString());
    fs.writeFile("./data/Ex02.json", JSON.stringify(convertedData), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("success");
      }
    });
    console.log("end");
  });
})
response.end('error')
}).listen(3001)
