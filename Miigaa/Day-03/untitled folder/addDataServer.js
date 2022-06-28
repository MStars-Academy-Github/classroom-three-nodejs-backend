const http = require("http")
const fs = require("fs")

http.createServer((request,response)=>{
    console.log(`Request URL is : ${request.url}`);
    console.log(`Request Method is : ${request.method}`);

    if(request.url === '/add/food'){
        console.log("add food");
        if(request.method === 'POST'){
            console.log('It is add food Post method');
            request.on('data', chunk => {
                console.log(`Data chunk available: ${chunk}`);
                fs.readFile(".data/food.json", "utf-8", (err,data) => {
                    if(err){
                        console.error(err)
                        return
                    }else {
                        console.log(data);
                        const arr = [JSON.parse(data)]
                        const newData = Json.parse(chunk)
                        arr.push(newData)
                        fs.writeFile("./data/food.json" , JSON.stringify(arr),err =>{
                            if (err){
                                console.error(err)
                            }else{
                                console.log("success");
                            }
                            
                        })
                    }
                })
                
            })
            request.on('end',()=>{
                console.log(`end of data`);
            })
        }
    }

    response.end("<h1>Hello</h1>")
}).listen(3000)