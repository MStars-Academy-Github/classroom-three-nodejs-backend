const fs = require("fs");
const url = require("url");
const http = require("http");

http
  .createServer((request, response) => {
    console.log(`Request URL is : ${request.url}`);
    console.log(`Request URL is : ${request.method}`);
    const parseURL = url.parse(request.url, true);
    console.log(parseURL);
    const catID = parseURL.path.split("id=")[1];
    const catIdUpdate = parseURL.path.split("/update/")[1];
    if (request.url == "/add/categories") {
      console.log("add food");
      if (request.method === "POST") {
        console.log("it is add food Post method");
        console.log(request.body);
        request.on("data", (chunk) => {
          fs.readFile("./data/cate.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
            } else {
              const arr = JSON.parse(data);
              const chunkObj = JSON.parse(chunk);
              let catIds = arr.map((cat) => {
                return cat._id;
              });
              if (catIds.filter((category) => category !== chunkObj._id)) {
                arr.push(chunkObj);
                fs.writeFile("./data/cate.json", JSON.stringify(arr), (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(arr);
                  }
                });
              }

              console.log(data);
            }
          });

          console.log(`Data chunk available : ${chunk}`);
        });
        request.on("end", () => {
          console.log("end of data");
        });
      }
    } else if (request.method === "PUT") {
      request.on("data", (chunk) => {
        fs.readFile("./data/cate.json", "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            let arr = JSON.parse(data);
            let chunkObj = JSON.parse(chunk);
            console.log(catIdUpdate);
            arr = arr.map((cate) =>
              cate._id == catIdUpdate ? chunkObj : cate
            );
            fs.writeFile("./data/cate.json", JSON.stringify(arr), (err) => {
              if (err) {
                console.log(err);
              } else console.log(arr);
            });
          }
        });
      });
    } else if (request.method === "DELETE") {
      request.on("data", () => {
        fs.readFile("./data/cate.json", "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            let arr = JSON.parse(data);
            console.log(catID);
            let remarr = arr.filter((cate) => cate._id !== catID);
            if (remarr) {
              fs.writeFile(
                "./data/cate.json",
                JSON.stringify(remarr),
                (err) => {
                  if (err) {
                    console.log(err);
                  } else console.log("success");
                }
              );
            } else console.log("Categoreis ID is not found");
          }
        });
      });
    }
    response.end("<h1>Helloo</h1>");
  })
  .listen(3005);
