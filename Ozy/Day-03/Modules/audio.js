const fs = require("fs");
const AudioFile = `${__dirname}/data/audio.mp3`;

function serverAudioFile(request, response){
    response.setHeader("Content-Type", "audio/mp3")
      fs.createReadStream(AudioFile)
      .on("error", () => {
          console.error("err");
      })
      .pipe(response);}

module.exports = serverAudioFile
