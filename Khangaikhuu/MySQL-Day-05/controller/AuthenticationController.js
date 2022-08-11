const express = require("express");
const router = express.Router();
const register = require("../services/register");
const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res, next) => {
  try {
    const params = req.body;
    if (Object.values(params).length === 0) {
      res.status(400).json({
        success: false,
        message: "No user data is provided",
      });
    }
    // check the email address already exists in DB
    // if user does not exist require the user to register
    const { email, user_password } = params;
    const existingUser = await userService.findUserByEmail(email);
    console.log();
    if (existingUser.data.length === 0) {
      res.status(400).json({
        success: false,
        message: "User does not exist. Please register first",
      });
    } else {
      // when user is already registered,
      // then check the corresponding password is correct for the given email
      if (
        await bcrypt.compare(user_password, existingUser.data[0].user_password)
      ) {
        const token = jwt.sign(
          { user_name: existingUser.data[0].first_name, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({
          success: true,
          data: { email: email },
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          data: "Email or Password do not match",
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    // when the request body is empty object
    if (Object.values(params).length === 0) {
      res.status(400).json({
        success: false,
        message: "No user data is provided",
      });
    }
    // check the email address already exists in DB
    const { email, first_name } = params;
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser.data.length > 0) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const token = jwt.sign(
        { user_name: first_name, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      console.log(token);
      // call the register service
      const user = await register.registerUser(params);
      console.log(user);
      res.status(200).json({
        success: true,
        data: {
          userName: first_name,
          email: email,
        },
        token: token,
      });
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
