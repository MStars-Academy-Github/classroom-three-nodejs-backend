const http = require("http");

const JsonFile = [
    { name: "banhar",
       gender: "male",
        specie: "dog"
    },
   { name: "muujgai",
       gender: "female",
        specie: "cat"
    }
  ]
  

http.createServer(function (request, response) {
    response.writeHead(200);
    response.write(JsonFile)
    response.end();
})
.listen(3000);
console.log("Server running at http://localhost:3000");
