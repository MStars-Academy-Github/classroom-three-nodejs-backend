const express = require("express");
const app = express();
const { body, validationResult } = require("express-validator");
const { userValid, validate } = require("./valid");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is working");
});
app.post("/users", userValid(), validate, (req, res) => {
  const body = req.body;

  res.send(body);
});
app.get("/user", (req, res) => {
  res.send("I will send user info");
});
app.post("/user", (req, res) => {
  res.send("I will save info");
});
app.get(
  "/user/:id",
  (req, res, next) => {
    const user_id = req.params.id;
    if (user_id > 2000) next("route");
    if (user_id < 50) next();
    res.send(" I will send user info #1");
  },
  (req, res, next) => {
    res.send("I will send info #1.1");
  }
);
app.get("/user/:id", (req, res) => {
  res.send("I will send user info #2");
});

function logOriginal(req, res, next) {
  console.log("Request URL:", req.originalUrl);
  next();
}
function logMethod(req, res, next) {
  console.log("Request Type:", req.method);
  next();
}

const logStuff = [logOriginal, logMethod];

app.get("/arrayuser/:id", logStuff, (req, res, next) => {
  res.send("User info");
});
app.listen(PORT);
