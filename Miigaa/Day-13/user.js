const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());

app.get(
  "/user/:id",
  (req, res, next) => {
    const user_id = req.params.id;
    if (user_id > 2000) next("route");
    if (user_id < 50) next();
    res.send("I will send user information");
  },
  (req, res, next) => {
    res.send("I will send user information #1.1");
  }
);
app.get("/user/:id", (req, res) => {
  res.send("I will save information #2");
});

function logOrginalUrl(req, res, next) {
  console.log("Request Url:", req.orginalUrl);
  next();
}
function logMethod(req, res, next) {
  console.log("Request Type:", req.method);
  next();
}
const logStuff = [logOrginalUrl, logMethod];
app.get("/arrayuser/:id", logStuff, function (req, res, next) {
  res.send("User Info");
});

app.listen(3000);
