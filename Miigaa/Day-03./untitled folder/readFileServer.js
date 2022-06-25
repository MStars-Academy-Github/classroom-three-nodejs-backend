const fs = require("fs")

const asyncronReadFile = fs.readFile("./data/test.json", 'utf-8', (err,data) => {
    if(err){
        console.error(err)
        return
    }else {
        console.log(data);
    }
})


const syncronReadFile = fs.readFileSync("./data/test.json", "utf-8")

console.log(syncronReadFile);