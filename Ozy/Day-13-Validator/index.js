const express = require("express");
const validatorMiddleware = require("./validatorMiddleware.js");
const { userValidationRules, validate } = require("./validatorMiddleware");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/users", userValidationRules(), validate, (req, res) => {
  res.send("Success");
});

app.get(
  "/user/:id",
  (req, res, next) => {
    const user_id = req.params.id;
    if (user_id > 2000) next("route");
    if (user_id < 50) next();
    res.send("I will send user information #1");
  },
  (req, res, next) => {
    res.send("I will send user information #1.1");
  }
);
app.get("/user/:id", (req, res) => {
  res.send("I will send user information #2");
});

app.post("/user", (req, res) => {
  res.send("I will save information");
});

app.listen(PORT, () => {
  console.log("Running");
});

function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  console.log("Request Type:", req.method);
  next();
}

var logStuff = [logOriginalUrl, logMethod];
app.get("/arrayuser/:id", logStuff, (req, res, next) => {
  res.send("User Info");
});
