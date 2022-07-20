const express = require("express");
const app = express();
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is working");
});
app.post(
  "/users",
  body("email").isEmail(),
  body("registerID").isLength({ min: 10, max: 10 }),
  body("phone").isInt().isLength({ min: 8, max: 8 }),
  body("name").isString().matches(/(\w)/).withMessage("name must be letters"),
  body("password")
    .isLength({ min: 5 })
    .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)
    .withMessage(
      "password must contain minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces."
    ),
  body("passValid").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password must be matched ");
    }
    return true;
  }),
  (req, res) => {
    console.log(req.body.password);
    const body = req.body;
    console.log(body);
    const { name, email, phone } = body;
    console.log(name);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send(body);
  }
);
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
