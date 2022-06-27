const fs = require("fs");
const http = require("http");

http
  .createServer(function (request, response) {
    console.log(`Request URL is" ${request.url}`);
    console.log(`Request Method is" ${request.method}`);
    response.end("<h1>delete food</h1>");

    if (request.url === "/delete/food") {
      console.log("put food");
      if (request.method === "DELETE") {
        console.log("It is add food and Post method");
        request.on("data", (chunk) => {
          console.log(`Data chunk available: ${chunk}`);
          fs.readFile("./data/foods.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              const foodData = JSON.parse(data);
              const chunkObject = JSON.parse(chunk);
              console.log(chunkObject);
              foodData.data.push(chunkObject);
              fs.writeFile(
                "./data/foods.json",
                JSON.stringify(foodData),
                (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log("successfully deleted");
                  }
                }
              );
            }
          });
        });
        request.on("end", () => {
          // end of data
          console.log("end of data");
        });
      }
    }
  })
  .listen(3000);
console.log('Server running at http://localhost"3000');
