const express = require("express");
const userJson = require("./data/user.json");
const app = express();

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
  const a =
    userJson.filter((id) => {
      return id == req.params.userId;
    }).length > 0;
  console.log(a);
  if (a == true) {
    console.log("we have user");
  } else {
    console.log("we dont have user");
  }
});

app.listen(3000);
