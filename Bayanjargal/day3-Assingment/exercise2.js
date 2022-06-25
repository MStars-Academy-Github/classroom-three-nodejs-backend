const http = require("http");

const foodsfile = require("./foods")
const serverCat=require("./serverCat")
const animalserve = require("./serverAnimal")
const animal = `${__dirname}/data/info.json`;

http
  .createServer(function (request, response) {
    if(request.url==="/"){
        console.log("root")
        return animalserve(request, response);
    }else if(request.url === "/api/foods"){
        return foodsfile(request ,response)
    }else if (request.url === "/api/categories"){
      return serverCat(request ,response)
    }else if(request.url === "/animal"){
        return animalserve(request,response)
    }
    
    else {(response.end("not found"))}
  })
  .listen(3000);
console.log("server running at http://localhost:3000");

const data = [
    {
        name:"banher",
        gender:'male'
    },{ name:"lucy",
    gender:'female'}
]

