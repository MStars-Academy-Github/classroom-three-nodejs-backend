const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.post(
  "/users",
  body("email").isEmail(),
  body("register").isLength({ min: 10, max: 10 }),
  (req, res) => {
    const body = req.body;
    console.log(body);
    const { name, email, phone } = body;
    console.log(name);
    console.log(email);
    console.log(phone);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("users");
  }
);

app.listen(PORT, () => {
  "Express server is starting";
});
