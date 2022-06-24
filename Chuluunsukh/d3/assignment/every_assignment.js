const http = require("http");
const fs = require("fs");


const servejsonFoodsFile = require("./jsonServe")
const serveAnimalFile = require("./animalServe")


http
  .createServer (function(request, response) {
      if (request.url === '/api/foods' ){
        return servejsonFoodsFile(request, response)
    } else if (request.url === '/animal' ){
      return serveAnimalFile(request, response)
  } 
     else {
        response.end('Not found')
    }
    
  })
  .listen(3000);
console.log('Server running at http://localhost"3000');




