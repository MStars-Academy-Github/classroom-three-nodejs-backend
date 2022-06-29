const https = require('https')
const http = require('http')
const fs = require('fs')
const serveFilm = require('./films')
http.createServer((request, response) => {
    // response.writeHead(200);
    // response.setHeader("Content-type", "text/html");

    fs.readFile('./data/film.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('error');
        } else {
            const films = JSON.parse(data)
            films.shift()
            console.log(films[0].title);
            
            fs.createReadStream(films)
                .on("error", () => {
                    console.error("err");
                })
                .pipe(`hello world`);
        }
    })



    response.end()




}).listen(3002)