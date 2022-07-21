const express = require("express");
const app = express();
const fs = require("fs");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

app.get("/user/:userId/books/:bookId", function (req, res) {
  res.send(req.params);

  fs.readFile("./data/user.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log(data);
    }
  });
});

app.listen(3000);
