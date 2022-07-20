const express = require("express");
const { userValidationRules, validate } = require("./validatorMiddleware.js");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.post("/users", userValidationRules(), validate, (req, res) => {
  res.send("users");
});

app.listen(PORT, () => {
  "Express server is starting";
});
