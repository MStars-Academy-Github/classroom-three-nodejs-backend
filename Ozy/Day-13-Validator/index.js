const express = require("express");
const { body, validationResult, check } = require("express-validator");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post(
  "/users",
  body("email").isEmail(),
  body("register").isLength({ min: 10, max: 10 }),
  body("phone")
    .isNumeric()
    .isLength({ min: 8, max: 8 })
    .withMessage("only phone number"),
  check("password")
    .isLength({ min: 8 })
    .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)
    .withMessage(
      "Checks that a password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces."
    ),
  check("name")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Name must only string"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("Success");
  }
);

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
