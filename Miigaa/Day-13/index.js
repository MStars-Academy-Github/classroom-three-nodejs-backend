const express = require("express");
const { body, validationResult } = require("express-validator");
const { userValidationRules, validate } = require("./validatorMiddleware");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());
const cors = require("cors");

app.get("/", cors(), (req, res) => {
  res.send("<h1>Hello world</h1>");
});
app.post("/users", userValidationRules(), validate, (req, res) => {
  res.send("users");
});

app.listen(PORT);
