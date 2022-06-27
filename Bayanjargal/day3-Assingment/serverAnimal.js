const fs = require("fs");
const animal = `${__dirname}/data/info.json`;
const  animalServer = (request , response)=>{
    response.setHeader("Content-Type","application/json")
    fs.createReadStream(animal)
        .on("error",()=>{
            console.log("error")
        })
        .pipe(response)

}
module.exports = animalServer