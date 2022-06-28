const fs = require("fs");
const AudioFile = `${__dirname}/data/Noot.mp3`;

function AudioServerFile(req, res) {
  res.setHeader("Content-Type", "audio/mpeg");
  fs.createReadStream(AudioFile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(res);
}

module.exports = AudioServerFile