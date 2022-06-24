const fs = require("fs");
const VideoFile = `${__dirname}/data/video.mp4`;


function serverVideoFile(request, response){
    response.setHeader("Content-Type", "video/mp4")
      fs.createReadStream(VideoFile)
      .on("error", () => {
          console.error("err");
      })
      .pipe(response);}   

module.exports = serverVideoFile