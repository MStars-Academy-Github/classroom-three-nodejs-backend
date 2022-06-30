const https = require('https')
const http = require('http')
const fs = require('fs')
http.createServer((request, response) => {

    https.get("https://ghibliapi.herokuapp.com/films", (res) => {
        res.on("data", (d) => {
            const temp = (d.toString());
            // console.log( temp)
            fs.readFile('./data/film.json' , 'utf-8' , (err , data)=>{
                if(err){
                    console.log('error');
                }else{
                    // console.log(data);
                    fs.writeFile('./data/film.json' , temp , (err)=>{
                        if(err){
                            console.log('error');
                        }else{
                            console.log('success');
                        }
                    })
                }
            })
            
        });
        
    })
    response.end('error')

}).listen(3001)