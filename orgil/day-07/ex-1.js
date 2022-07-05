const os = require("node:os");
const http = require("http");

http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    console.log("Platform:");
    console.log(os.platform());
    concole.log("===========");
    console.log("Architecture:");
    console.log(os.arch());
    concole.log("===========");
    console.log("Release:");
    console.log(os.release());
    concole.log("===========");
    console.log("Total Memory:");
    console.log(os.totalmem());
    concole.log("===========");
    console.log("Total CPU's:");
    console.log(os.cpus());
    concole.log("===========");
    console.log("Free Memory:");
    console.log(os.freemem());
    res.end("<h1>HELLO</h1>");
  })
  .listen(3000);
