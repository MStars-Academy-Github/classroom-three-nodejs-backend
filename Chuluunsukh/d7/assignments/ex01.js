// os module
const http = require("http");
const os = require("os");
const { listenerCount } = require("process");

// creating server

http.createServer(function (request, response) {
  response.writeHead(200);
  response.write(
    JSON.stringify({
      // os module ways
      Platfrom: os.platform(),
      Architecture: os.arch(),
      Release: os.release(),
      Totalcpus: os.cpus(),
      TotalMemory: os.totalmem(),
      FreeMemory: os.freemem(),
    })
  );
  //   response duusgaj baigaa heseg
  response.end();
});

listenerCount(3000);
console.log("Server running at http://localhost:3000");
