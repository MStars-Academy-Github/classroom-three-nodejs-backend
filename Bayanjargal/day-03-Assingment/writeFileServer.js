const fs = require ("fs")

const change =  {
    name :"test",
    chander : "male",
    intrest:"noby"

}
fs.writeFile("./data/foods.json",JSON.stringify(change), err=>{
    if (err){console.log(err)}else{
        console.log("succes")
    }
})