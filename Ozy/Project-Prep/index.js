const express = require("express");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT;
const app = express();
const router = require("./routes/api");
const bookRouter = require("./routes/bookRouter");

app.use(expressLayouts);
app.set("layout", "./layouts/full-width");
app.set("view engine", "ejs");
app.use(router);
app.use(bookRouter);

app.get("", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Running");
});
