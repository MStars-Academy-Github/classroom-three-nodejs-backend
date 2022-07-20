const express = require("express");
const app = express();
const { userValidationRules, validate } = require("./midlewarevalidation");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});
app.post("/users", userValidationRules(), validate, (req, res) => {
  const body = req.body;
  const { name, email, phone, register } = body;
  console.log(name);
  console.log(email);
  console.log(phone);

  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  res.send("users");
});
app.get(
  "/user/:id",
  function (req, res, next) {
    const user_id = req.params.id;

    if (user_id > 2000) next("route");
    if (user_id < 50) next();
    res.send("i will send user info #1");
  },
  function (req, res, next) {
    res.send("i will send user info #1.1");
  }
);

app.get("/user/:id", function (req, res) {
  res.send("i will save info #2");
});

function logOriUrl(req, res, next) {
  console.log("request Url:", req.originalUrl);
  next();
}
function logMethod(req, res, next) {
  console.log("request Type:", req.method);
  next();
}
var logStuff = [logOriUrl, logMethod];
app.get("/arrayuser/:id", logStuff, function (req, res, next) {
  res.send("User Info");
});

app.listen(PORT, () => {
  console.log("express server is running");
});
