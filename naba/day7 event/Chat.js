let http = require("http");
let time = require("time");

http
  .createServer((request, response) => {
    console.log(`real time chat : ${time}`);
    console.log(`Request Method is : ${realtime}`);

    if (request.url === "/cost/category") {
      console.log("add food");
      console.log(request);
      if (request.method === "POST") {
        console.log("It is add food Post method");
        request.on("data", (chunk) => {
          console.log(`Data chunk available: ${chunk}`);
        });
        request.on("end", () => {
          // end of data
          console.log("end of data");
        });
      }
    }
  })
  .lisen(3000);
