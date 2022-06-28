const fs = require("fs");
const foods = `${__dirname}/data/foods.json`;
const  foodsServeFile= (request , response)=>{
    response.setHeader("Content-Type","application/json")
    fs.createReadStream(foods)
        .on("error",()=>{
            console.log("error")
        })
        .pipe(response)
}
module.exports = foodsServeFile