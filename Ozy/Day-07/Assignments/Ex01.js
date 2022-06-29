const http = require("http");
const os = require("os");

http
  .createServer(function (request, response) {
    response.writeHead(200);
    response.write(
      JSON.stringify({
        Platform: os.platform(),
        Architecture: os.arch(),
        Release: os.release(),
        TotalMemory: os.totalmem(),
        TotalCpus: os.cpus(),
        FreeMemory: os.freemem(),
      })
    );
    response.end();
  })
  .listen(3000);
console.log("Server running at http://localhost:3000");
