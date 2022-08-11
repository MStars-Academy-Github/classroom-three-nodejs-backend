const express = require("express");
const register = require("../service/register");
const router = express.Router();
const userService = require("../service/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    // when the request body is empty object
    if (Object.values(params).length === 0) {
      res.statusCode(400).json({
        success: false,
        message: "No user data is provided",
      });
    }
    // check the email address already exist in DB
    const { email, firstName } = params;
    const existUser = await userService.findUserByEmail(email);
    if (existUser.data.length > 0) {
      res.status(400).json({
        success: false,
        message: "user already exists",
      });
    } else {
      const token = jwt.sign(
        {
          userName: firstName,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2hr",
        }
      );
    }
    console.log(existUser);
    // call register service
    const user = await register.registerUser(params);
    res.status(200).json({
      success: true,
      data: { userName: firstName, email: email },
    });
  } catch {
    error;
  }
  {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
