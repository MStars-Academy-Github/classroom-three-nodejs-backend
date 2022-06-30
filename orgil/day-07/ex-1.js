const os = require("node:os");
const http = require("http");

http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    console.log(os.platform());
    res.end();
  })
  .listen(3000);
