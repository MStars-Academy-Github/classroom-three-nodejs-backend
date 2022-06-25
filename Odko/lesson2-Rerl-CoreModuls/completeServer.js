const file = require("fs");
var http = require("http");

// dynamic path

const querystring = require("querystring");
const url = require("url");

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

    if (request.url === "/json") {
      return serverJsonFile(request, response);
    } else if (request.url === "/image") {
      return serverImageFile(request, response);
    } else if (request.url === "/audio") {
      return serverAudioFile(request, response);
    } else if (request.url === "/video") {
      return serverVideoFile(request, response);
    } else if (request.url === "/add/food") {
      // ene bol incomiagar request ywulad POST methodtoi
      console.log("add food");
      if (request.method === "POST") {
        console.log("POST");
        request.on("data", (chunk) => {
          console.log(`data ${chunk}`);
          file.readFile(
            "../lesson3-Read-Write/assignment/data/foods.json",
            "utf-8",
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
                let arr = JSON.parse(data);
                let chunk1 = JSON.parse(chunk);
                arr.push(chunk1);
                file.writeFile(
                  "../lesson3-Read-Write/assignment/data/foods.json",
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
        response.end("Not Found");
        request.on("end", () => {
          console.log("end");
        });
      }
    } else if (request.url.match(/^\/delete/)) {
      //   path ? or / modul
      querystring.parse(request.url.split("?").slice(1).join(""));
      // console.log(querystring.parse(request.url.split("?").slice(1).join("")));

      console.log();

      file.readFile(
        "../lesson3-Read-Write/assignment/data/foods.json",
        "utf-8",
        (err, data) => {
          if (err) {
            console.error(err);
            return;
          } else {
            const result = JSON.parse(data).filter(
              (id) =>
                `id=${id._id}` === request.url.split("?").slice(1).join("")
            );

            const dlt = delete [result];
            [data].push(dlt);
            file.writeFile(
              "../lesson3-Read-Write/assignment/data/foods.json",
              data,
              (err) => {
                if (err) {
                  console.error(err);
                  return;
                } else {
                  console.log(data);
                }
              }
            );
          }
        }
      );

      response.end("delete");
    } else if (request.url.match(/^\/update/)) {
      const parsedURL = url.parse(request.url, true);
      console.log(parsedURL);
      response.end("update");
    } else {
      response.end("Not Found");
    }
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
