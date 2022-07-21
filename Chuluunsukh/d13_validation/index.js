const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;
const { userValidationRules, validate } = require("./validatorMiddleware");

//   validator heseg
app.post("/register", userValidationRules(), validate, (req, res) => {
  res.send("register");
});

// app.get("/", (req, res) => {
//   res.send("<h1>Hello</h1>");
// });

// // middleware heseg
// app.get("/user", function (req, res) {
//   res.send("i will send information");
// });
// app.post("/user", function (req, res) {
//   res.send("i will save information");
// });
// app.get(
//   "/user/:id",
//   function (req, res, next) {
//     const user_id = req.params.id;
//     if (user_id > 2000) next("route");
//     if (user_id < 50) next();
//     res.send("i will send information #1");
//   },
//   function (req, res, next) {
//     res.send("i will send user information #1.1");
//   }
// ),
//   app.get("/user/:id", function (req, res) {
//     res.send("i will save information #2");
//   });
// //   middleware array

// function logOriginalUrl(req, res, next) {
//   console.log("Request URL:", req.originalUrl);
//   next();
// }
// function logMethod(req, res, next) {
//   console.log("Request Type:", req.method);
//   next();
// }
// var logStuff = [logOriginalUrl, logMethod];
// app.get("/arrayuser/:id", logStuff, function (req, res, next) {
//   res.send("User info");
// });

// middleware validator

// const validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//   }
// };

app.listen(PORT, () => {
  "Express server is starting";
});
