const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/api/categories") {
      fs.readFile("./data/categories.json", "utf-8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        } else {
          res.end(data);
        }
      });
    } else if (req.url === "/add/category") {
      if (req.method === "GET") {
        console.log("it is add category GET method");
        req.on("data", (chunk) => {
          console.log(`Data chunk avaible : ${chunk}`);
          fs.readFile("./data/categories.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              let arr = JSON.parse(data);

              if (arr.data.map((e) => e._id !== chunk._id)) {
                let newData = JSON.parse(chunk);
                arr.data.push(newData);
                fs.writeFile(
                  "./data/categories.json",
                  JSON.stringify(arr),
                  (err) => {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log("success");
                    }
                  }
                );
              }
            }
          });
        });
        req.on("end", () => {
          console.log("end of data");
        });
      }
    } else if (req.url.match(/^\/update/)) {
      if (req.method === "PUT") {
        console.log(req.url.slice(8));
        let foodID = req.url.slice(8);
        req.on("data", (chunk) => {
          console.log(`Data chunk avaible : ${chunk}`);
          fs.readFile("./data/categories.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              let arr = JSON.parse(data);
              let newData = JSON.parse(chunk);
              arr = arr.data.map((e) => {
                return e._id !== foodID ? e : newData;
              });
              fs.writeFile(
                "./data/categories.json",
                JSON.stringify(arr),
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
    } else if (req.url.match(/^\/delete/)) {
      let foodID = req.url.slice(8);
      console.log(req.url.slice(8));

      if (req.method === "DELETE") {
        console.log("it is add food Post method");
        req.on("end", () => {
          console.log("end of data");
          fs.readFile("./data/categories.json", "utf-8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              let arr = JSON.parse(data);
              arr.data = arr.data.map((e) => (e._id !== foodID ? e : null));
              filterdArr = arr.data.filter((item) => item !== null);
              arr.data = filterdArr;
              fs.writeFile(
                "./data/categories.json",
                JSON.stringify(arr),
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
    res.end();
  })
  .listen(3000);
