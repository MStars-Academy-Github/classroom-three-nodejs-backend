const express = require("express");
const app = express();

// app.get("/users/:userId/books/:bookId", (req, res) => {
//   res.send(req.params);
// });
// app.listen(3000);

app.get("/library", (req, res) => {
  res.send(req.query);
});
app.listen(3000);
