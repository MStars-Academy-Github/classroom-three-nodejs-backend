const express = require("express");

const app = express();

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

app.listen(3000);
