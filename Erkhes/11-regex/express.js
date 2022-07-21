const express = require("express");
const app = express();
const fs = require("fs");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

let datas;
fs.readFile("./data/user.json", "utf-8", (err, data) => {
  if (err) {
    console.log("error on reading");
  } else {
    datas = JSON.parse(data);
  }
});

app.get("/users/:userId/books/:bookId", (req, res) => {
  let num = 0;
  datas.map((e) => {
    if (e.userId == req.params.userId) {
      num++;
    }
  });
  if (num == 0) {
    console.log("no matching user with" + ` userId : ${req.params.userId}`);
    fs.readFile("./data/user.json", "utf-8", (err, data) => {
      if (err) {
        console.log("error on reading last");
      } else {
        datas = JSON.parse(data);
        datas.push(req.params);
        console.log(datas);
        fs.writeFile("./data/user.json", JSON.stringify(datas), (err) => {
          if (err) {
            console.log("error on writing");
          } else {
            console.log("success writing");
          }
        });
      }
    });
  } else {
    console.log(`userId : ${req.params.userId} is found`);
  }
  res.send(req.params);
});
app.listen(3000);
