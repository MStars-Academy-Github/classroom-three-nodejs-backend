var http = require("http");
const fs = require("fs");
const ImageFile = `${__dirname}/data/penguin.jpeg`;

function ImageServerFile(req, res) {
  res.setHeader("Content-Type", "image/png");
  fs.createReadStream(ImageFile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}
module.exports = ImageServerFile
