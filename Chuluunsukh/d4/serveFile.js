const fs = require("fs");

const servingFile = (req, res) => {
  const fileName = `${__dirname}/public${req.url.split("/public")[1]}`;
  fs.createReadStream(fileName)
    .on("error", () => {
      res.end("Not Found");
    })
    .pipe(res);
};

module.exports = servingFile;
