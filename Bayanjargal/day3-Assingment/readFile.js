const fs = require ("fs")
const readFile=fs.readFile("./data/foods.json" , "utf-8" , (err,data)=>{
if(err){console.error(err)
return}else{
    console.log(data)
}
})
const synchronReadFile = fs.readFileSync("./data/foods.json","utf-8")

console.log(synchronReadFile)
module.exports = readFile