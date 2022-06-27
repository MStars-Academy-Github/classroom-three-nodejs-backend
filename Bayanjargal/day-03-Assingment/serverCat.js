
const fs = require("fs");
const categoriesFile = `${__dirname}/data/categories.json`;
const categoriesServer =  (request , response)=>{
    response.setHeader("Content-Type","application/json")
    fs.createReadStream(categoriesFile)
        .on("error",()=>{
            console.log("error")
        })
        .pipe(response)

}
module.exports=categoriesServer