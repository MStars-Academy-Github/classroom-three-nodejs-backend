const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer((request, response) => {
    console.log(`Request URL is: ${request.url}`);
    console.log(`Request Method is : ${request.method}`);
    const parseURL = url.parse(request.url, true);
    const foodID = parseURL.search.split("?")[1];

    if (request.url.match(/^\/delete/)) {
      if (request.method === "DELETE") {
        console.log("it is add food Post method");
        request.on("end", () => {
          console.log("end of data");
          fs.readFile("./data/foods.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              let arr = JSON.parse(data);
              arr = arr.map((e) => (e._id !== foodID ? e : null));
              filterdArr = arr.filter((item) => item !== null);
              fs.writeFile(
                "./data/foods.json",
                JSON.stringify(filterdArr),
                (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log("success");
                  }
                }
              );
            }
          });
        });
      }
    }
    response.end("<h1>hello</h1>");
  })
  .listen(3000);
