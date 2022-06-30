const http = require("http");
const os = require("os");

const osdir = {
  Platform: os.platform(),
  Architecture: os.arch(),
  uptime: os.uptime(),
  loadavg: os.loadavg(),
  totalmem: os.totalmem(),
  freemem: os.freemem(),
  cpus: os.cpus(),
};

http
  .createServer((request, response) => {
    response.write(JSON.stringify(osdir));
    response.end();
  })
  .listen(3000);
console.log("running localhost:3000");
