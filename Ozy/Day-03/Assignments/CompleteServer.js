const http = require("http");
const fs = require("fs");

const AnimalJsonFile = `${__dirname}/data/animal.json`;
const FoodsJsonFile = `${__dirname}/data/foods.json`;
const categoriesJsonFile = `${__dirname}/data/categories.json`;

http
  .createServer(function (request, response) {
    if(request.url === "/"){
      return serverAnimalJsonFile(request, response)
    }
    if(request.url === "/api/foods"){
      return serverFoodsJsonFile(request, response)
    }
    if(request.url === "/api/categories"){
      return serverCategoriesJsonFile(request, response)
    }else(response.end("not found") )
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");


//``````````Animal Json File Server
function serverAnimalJsonFile(request, response){
  response.setHeader("Content-Type", "application/json")
    fs.createReadStream(AnimalJsonFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(response);}


//``````````Foods Json File Server
function serverFoodsJsonFile(request, response){
    response.setHeader("Content-Type", "application/json")
      fs.createReadStream(FoodsJsonFile)
      .on("error", () => {
        console.error("err");
      })
      .pipe(response);}

//``````````Categories Json File Server
function serverCategoriesJsonFile(request, response){
    response.setHeader("Content-Type", "application/json")
      fs.createReadStream(categoriesJsonFile)
      .on("error", () => {
        console.error("err");
      })
      .pipe(response);}
