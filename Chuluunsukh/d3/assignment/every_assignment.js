const http = require("http");
const fs = require("fs");


const animalname = `${__dirname}/data/animal.json`;
const  foodsmenu= `${__dirname}/data/foods.json`;
const  categoryname= `${__dirname}/data/categories.json`;


http
  .createServer (function(request, response) {
      if (request.url === '/api/foods' ){
        return servejsonFoodsFile(request, response)
    } else if (request.url === '/animal' ){
      return serveAnimalsFile(request, response)
  } else if (request.url === '/api/categories' ){
    return serveCategoriesFile(request, response)
}
     else {
        response.end('Not found')
    }
    
  })
  .listen(3000);
console.log('Server running at http://localhost"3000');


// serves json file
function servejsonFoodsFile (request, response) {
  response.setHeader("Content-type", "application/json");
  fs.createReadStream(foodsmenu)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}
// serves json animal file
function serveAnimalsFile (request, response) {
  response.setHeader("Content-type", "application/json");
  fs.createReadStream(animalname)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}

// serves json category file
function serveCategoriesFile (request, response) {
  response.setHeader("Content-type", "application/json");
  fs.createReadStream(categoryname)
    .on("error", () => {
      console.log("error");
    })
    .pipe(response);
}

