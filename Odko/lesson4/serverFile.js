const fs = require("fs");
const serverFile = (req, res) => {
  const filename = `${__dirname}/public${req.url.split("/public")[1]}`;
  fs.createReadStream(filename)
    .on("error", () => {
      res.end("not pound");
    })
    .pipe(res);
};

module.exports = serverFile;
