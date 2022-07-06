const express = require("express");
const app = express();
const fs = require("fs");

app.get("/users/:userId", (req, res) => {
  fs.readFile("./users.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let users = JSON.parse(data);
      let value = JSON.parse(req.params.userId);
      let result = users.find((e) => e.userId === value);
      console.log(result);
      res.write(JSON.stringify(result));
      res.end();
    }
  });
});
app.listen(3000);
