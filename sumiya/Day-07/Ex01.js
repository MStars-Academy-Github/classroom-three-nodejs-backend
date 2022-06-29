const os = require("node:os");
const fs = require("fs");
const http = require("http");

const localComInfo = {
  Platform: os.platform(),
  Architecture: os.arch(),
  Release: os.release(),
  "Total Memory": os.totalmem(),
  "Total Cpus": os.cpus()[0].model,
  "Free Memory": os.freemem(),
};

http
  .createServer((request, response) => {
    if (request.url === "/") {
      const writeMyPcInfo = `Your Operating System :  ${
        localComInfo["Total Cpus"]
      } ${localComInfo.release} ${localComInfo["Free Memory"]} of your ${localComInfo["Total Memory"]} is free`;

      fs.writeFile("./data/Ex01.json", JSON.stringify(localComInfo), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(writeMyPcInfo);
        }
      });
    }
    response.end("error");
  })
  .listen(3000);
