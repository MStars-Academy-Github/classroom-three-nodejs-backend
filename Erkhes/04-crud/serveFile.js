const fs = require("fs");

function serveFile(req, res) {
  const fileName = `${__dirname}/public${req.url.split("/public")[1]}`;
  fs.createReadStream(fileName)
    .on("error", () => {
      res.end("err");
    })
    .pipe(res);
}
module.exports = serveFile;
