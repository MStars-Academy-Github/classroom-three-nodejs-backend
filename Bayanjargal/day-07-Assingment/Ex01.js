const os = require("os");
const fs = require("fs");
const http = require("http");
const local = {
  "Home Direction": os.homedir(),
  "Operating System": os.type(),
  "Last Reboot": os.uptime(),
  Platform: os.platform(),
  Release: os.release(),
  architecture: os.arch(),
  Memory: os.freemem(),
};
console.log(local);
http
  .createServer((request, response) => {
    if (request.url === "/") {
      //   response.setHeader("Content-Type", "application/json");
      fs.createReadStream("<h1>Hello</h1>")
        .on("error", () => {
          console.log("error");
        })
        .pipe(response);
    }
  })
  .listen(3006);
