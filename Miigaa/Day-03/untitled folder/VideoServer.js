
const fs = require("fs");
const VideoFile = `${__dirname}/data/Penguin.mp4`;

function VideoServerFile(req, res) {
  res.setHeader("Content-Type", "video/mp4");
  fs.createReadStream(VideoFile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}
module.exports = VideoServerFile