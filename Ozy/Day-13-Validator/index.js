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
  body("phone").isNumeric().isLength({ min: 8, max: 8 }),
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
    res.send("users");
  }
);

app.listen(PORT, () => {
  console.log("Running");
});
