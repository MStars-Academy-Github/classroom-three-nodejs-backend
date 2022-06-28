const http = require("http");
const fs = require("fs");

http
  .createServer((request, response) => {
    console.log(`Request URL is: ${request.url}`);
    console.log(`Request Method is : ${request.method}`);

    if (request.url.match(/^\/update/)) {
      console.log("add food");
      console.log("1", request.url.slice(8));
      let foodID = request.url.slice(8);
      if (request.method === "PUT") {
        console.log("it is add food Post method");
        request.on("data", (chunk) => {
          console.log(`Data chunk avaible : ${chunk}`);
          fs.readFile("./data/foods.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              let arr = JSON.parse(data);
              console.log(data);
              let newData = JSON.parse(chunk);
              arr = arr.map((e) =>
                e._id === foodID ? arr.splice(e, 1) : newData
              );
              arr.push(newData);
              fs.writeFile("./data/foods.json", JSON.stringify(arr), (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("success");
                }
              });
            }
          });
        });
        request.on("end", () => {
          console.log("end of data");
        });
      }
    }
    response.end("<h1>hello</h1>");
  })
  .listen(3000);