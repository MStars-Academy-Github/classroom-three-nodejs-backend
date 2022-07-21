const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const { body, validation, validationResult } = require("express-validator");

const {
  userValidation,
  validate,
} = require("../validatorMiddleware/validatorMiddleware");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>HI<h1>");
});
app.post("/users", userValidation(), validate, (req, res) => {
  res.send("users");
});

app.post(
  "/register",
  body("phone")
    .isLength({ min: 8, max: 8 })
    .matches(/^\+?[1-9][0-9]{7,14}$/),
  body("password").isStrongPassword(),
  body("name").matches(/^\[a-zA-Z]$/),
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("Amjilttai");
  }
);

// app.get("/user", (req, res, next) => {
//   res.send("1 i will save information");
// });
// app.post("/user", (req, res) => {
//   res.send("2 i will save information");
// });

/* route-1 */
app.get(
  "/user/:id",
  (req, res, next) => {
    const user_id = req.params.id;
    if (user_id > 2000) next("route");
    if (user_id < 50) next();
    res.send("i will send user information #1");
  },
  (req, res, next) => {
    res.send("i will send user information #1.1");
  }
);
app.get("/user/:id", (req, res) => {
  res.send("i will send user information #2");
});

/* route-2 */
function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.originalUrl);
  next();
}
function logMethod(req, res, next) {
  console.log("Request Type", req.method);
  next();
}
var logStuff = [logOriginalUrl, logMethod];
app.get("/arrayuser/:id", logStuff, function (req, res, next) {
  res.send("User Info");
});

app.listen(PORT, () => {
  "Starting";
});
