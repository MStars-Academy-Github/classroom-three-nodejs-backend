const http = require("http");
const fs = require("fs");

http
  .createServer((request, response) => {
    // console.log(`Request URL is: ${request.url}`);
    // console.log(`Request Method is : ${request.method}`);

    if (request.url.match(/^\/update/) && request.method === "PUT") {
      // console.log("add food");
      // console.log("1", request.url.slice(8));
      let foodID = request.url.slice(8);
      // console.log("it is add food Post method");
      request.on("data", (chunk) => {
        // console.log(`Data chunk avaible : ${chunk}`);
        fs.readFile("./data/foods.json", "utf-8", (err, data) => {
          let arr = [];
          arr = JSON.parse(data);
          let newData = JSON.parse(chunk);
          console.log(arr, "this is array");
          console.log(JSON.parse(newData._id), "this is chunk id");
          if (err) {
            console.error(err);
            return;
          } else {
            arr = arr.map((e) => {
              console.log(e);
              if (e._id === newData._id) {
                // console.log("error");
                arr.splice(e, 1);
              }
            });
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
    response.end("<h1>hello</h1>");
  })
  .listen(3000);
