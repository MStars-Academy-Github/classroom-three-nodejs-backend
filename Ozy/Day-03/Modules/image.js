const fs = require("fs");
const ImageFile = `${__dirname}/data/pic.jpeg`;

function serverImageFile(request, response) {
  response.setHeader("Content-Type", "image/jpeg");
  fs.createReadStream(ImageFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(response);
}

module.exports = serverImageFile;
