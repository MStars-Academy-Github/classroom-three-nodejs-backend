const express = require("express");
const users = require("../service/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
router.get("/", async (req, res, next) => {
  try {
    res.json(await users.getAllUser());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.post("/register", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    // if params have a no body data send user data provided
    if (Object.values(params).length == 0) {
      res.status(400).json({
        success: false,
        message: "No user data provided",
      });
    }
    const { email, firstName } = params;
    const existingUser = await users.FindUser(email);

    // If user have a already in database check from data and send to user already exits!!

    if (existingUser.data.length > 0) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const token = jwt.sign({ user_name: firstName }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      const user = await users.createUser(params);
      res.status(200).json({
        success: true,
        data: firstName,
        token: token,
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
// User login in application

router.post("/login", async (req, res, next) => {
  try {
    const params = req.body;
    if (Object.values(params).length == 0) {
      res.status(400).json({
        success: false,
        message: "No user data provided",
      });
    }
    const { email, password } = params;
    const existingUser = await users.FindUser(email);
    console.log(existingUser.data[0].user_password);
    if (existingUser.data[0].length === 0) {
      res.status(400).json({
        success: false,
        message: "User doesn't exit. Please register first",
      });
    }
    // when user is a already register
    // then check the corresponding user password

    if (await bcrypt.compare(password, existingUser.data[0].user_password)) {
      // Creat token

      const token = jwt.sign(
        { user_name: existingUser.data[0].first_name },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json({
        success: true,
        data: {
          email: email,
          firstName: existingUser.data[0].first_name,
          address: existingUser.data[0].address,
          phoneNumber: existingUser.data[0].phone_number,
        },
        token: token,
      });
    } else {
      res.status(401).json({
        success: false,
        data: "Username or Email don't match",
      });
    }
  } catch (err) {
    console.log(err);
  }
});
router.delete("/delete", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await users.deleteUser(params));
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.put("/update-user", async (req, res, next) => {
  const params = req.body;
  try {
    res.json(await users.updateUser(params));
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await users.getUserById(id));
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
