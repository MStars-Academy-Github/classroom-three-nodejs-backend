const http = require("http");
const fs = require("fs");
const films = `${__dirname}/data/people.html`;

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "content-type": "text/html" });
//     fs.createReadStream(films)
//       .on("error", () => {
//         console.log("error");
//       })
//       .pipe(res);
//   })
//   .listen(3000);
// console.log("runnnig 3000");

const serverHTML = (req, res) => {
  res.setHeader(200, { "Content-Type": "text/html" });
  fs.createReadStream(films)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
};

module.exports = serverHTML;
