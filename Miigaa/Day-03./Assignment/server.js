var http = require("http")
const fs =require("fs")

const JsonFile = `${__dirname}/data/profile.json`;
const FoodFile = `${__dirname}/data/food.json`;
const AnimalFile = `${__dirname}/data/animal.json`;


http.createServer((request, response) => {
    if (request.url === "/api/profile") {
        return jsonFile(request, response);
      } else if (request.url === "/api/food") {
        return FoodServerFile(request, response);
      } else if (request.url === "/api/animal") {
        return AnimalServerFile(request, response);
      }else {
        response.end("Not Found");
      }
  
      fs.createReadStream(JsonFile)
        .on("error", () => {
          console.log("error");
        })
        .pipe(response);
    })
    .listen(3000);

    // server profile file
function jsonFile(req, res) {
    res.setHeader("Content-Type", "application/json");
    fs.createReadStream(JsonFile)
      .on("error", () => {
        console.log("error");
      })
      .pipe(res);
  }
  // server food file
  function FoodServerFile(req, res) {
    res.setHeader("Content-Type", "application/json");
    fs.createReadStream(FoodFile)
      .on("error", () => {
        console.log("error");
      })
      .pipe(res);
  }
  // server animal file
  function AnimalServerFile(req, res) {
    res.setHeader("Content-Type", "application/json");
    fs.createReadStream(AnimalFile)
      .on("error", () => {
        console.log("error");
      })
      .pipe(res);
  }
 