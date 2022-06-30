const os = require("os");
const http = require("http");
const local = {
  "Home Direction": os.homedir(),
  "Operating System": os.type(),
  "Last Reboot": os.uptime(),
  Platform: os.platform(),
  Release: os.release(),
  architecture: os.arch(),
  CPU: os.cpus(),
  Memory: Math.floor(os.freemem() / 1024 / 1024),
};
console.log(local);
http
  .createServer((request, response) => {
    if (request.url === "/") {
      console.log(
        `Your Operation System: ${local.architecture} , your free memory is : ${local.Memory} and platform  is ${local.Platform} total CPU : ${local.CPU[0].model} and released id  : ${local.Release}`
      );
    }
  })
  .listen(3000);
