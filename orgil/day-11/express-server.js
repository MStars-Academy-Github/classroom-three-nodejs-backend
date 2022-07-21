const express = require("express");
const fs = require("fs");

const app = express();

app.get("/users/:userId", (req, res) => {
  res.send(req.params);
  const temp = req.params;
  const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

  users.filter((user) => {
    if (user.userId === temp.userId) {
      return console.log(`User Found ${user.userId}`);
    }
  });
});

app.listen(3000);
