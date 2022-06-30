
const http = require('http')
const osModule = require('./osModule')

http
    .createServer(function (request, response) {
        if ((request.url === "/")) {
           osModule()
        }
        response.end('check console log')
    })
    .listen(3000);
