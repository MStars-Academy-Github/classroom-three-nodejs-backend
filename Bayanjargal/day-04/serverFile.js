const fs = require("fs");

const serveFile = (req, res) => {
  const filename = `${__dirname}/public${req.url.split("/public")[1]}`;
  fs.createReadStream(filename)
    .on("err", () => {
      res.end("not found");
    })
    .pipe(res);
};

module.exports = serveFile;
