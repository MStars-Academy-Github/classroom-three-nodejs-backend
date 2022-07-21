const express = require("express");
const { validationResult } = require("express-validator");
const { userValidationRules, validate } = require("./validatorMiddleWare");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());
app.listen(PORT, () => {
  "Express starting ";
});
app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/users", userValidationRules(), validate, (req, res) => {
  res.send("burtgel amjilttai bolloo");
});
app.get("/user/:id", (req, res, next) => {
  const user_id = req.params.id;
  if (user_id > 2000) next("route");
  res.send("i will send user information #1");
});
app.get("/user/:id", (req, res) => {
  res.send("i will save information #2");
});

app.get(
  "/user/:id",
  (req, res, next) => {
    const user_id = req.params.id;
    if (user_id > 2000) next("route");
    if (user_id < 50) next();
    res.send("i will send user information #1");
  },
  (req, res, next) => {
    res.send("i will save information #1.1");
  }
);
app.get("/user/:id", (req, res) => {
  res.send("i will save information #2");
});
function logOriginalUrl(req, res, next) {
  console.log("Requiest URL:", req.originalUrl);
  next();
}
function logMethod(req, res, next) {
  console.log("Requiest URL:", req.method);
  next();
}
let logStuff = [logOriginalUrl, logMethod];
app.get("/arrayuser/:id", logStuff, (req, res, next) => {
  res.send("User Info");
});
