const file = require("fs");
var http = require("http");

const jsonfile = `${__dirname}/data/test.json`;
const audiofile = `${__dirname}/data/song.mp3`;
const imagesfile = `${__dirname}/data/image.jpeg`;
const videofile = `${__dirname}/data/videoplayback .mp4`;

http
  .createServer(function (request, response) {
    // response.setHeader('Access-Control-Allow-Origin', '*');
    // response.setHeader('Access-Control-Request-Method', '*');
    // response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    // response.setHeader('Access-Control-Allow-Headers', '*');
    if (request.url === "/add/food") {
      console.log("add food");

      if (request.method === "POST") {
        console.log("POST");
        request.on("data", (chunk) => {
          // console.log(`data ${chunk}`);
          file.readFile(
            "../lesson3/assignment/data/foods.json",
            "utf-8",
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
                let arr = JSON.parse(data);
                let chunk1 = JSON.parse(chunk);
                arr.push(chunk1);
                file.writeFile(
                  "../lesson3/assignment/data/foods.json",
                  JSON.stringify(arr),
                  (err) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("success");
                    }
                  }
                );
              }
            }
          );
        });
        request.on("end", () => {
          console.log("end");
        });
      }
      response.end();
    }

    // if (request.url === "/json") {
    //   return serverJsonFile(request, response);
    // } else if (request.url === "/image") {
    //   return serverImageFile(request, response);
    // } else if (request.url === "/audio") {
    //   return serverAudioFile(request, response);
    // } else if (request.url === "/video") {
    //   return serverVideoFile(request, response);
    // } else {
    //   response.end("Not Found");
    // }
  })
  .listen(3000);
console.log("server running at http://localhost:3000");

function serverJsonFile(request, response) {
  response.setHeader("Content-Type", "application/json");
  file
    .createReadStream(jsonfile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}

function serverImageFile(request, response) {
  response.setHeader("Content-Type", "image/jpeg");
  file
    .createReadStream(imagesfile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}

function serverAudioFile(request, response) {
  response.setHeader("Content-Type", "audio/mp3");
  file
    .createReadStream(audiofile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}

function serverVideoFile(request, response) {
  response.setHeader("Content-Type", "video/mp4");
  file
    .createReadStream(videofile)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}
