const express = require("express");
const router = express.Router();
const register = require("../services/register");
const userService = require("../services/userService");
const jwd = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res, next) => {
  try {
    const params = req.body;
    if (Object.values(params.email).length === 0) {
      res.status(400).json({
        success: false,
        message: "No user is provided",
      });
    }

    const { email, firstname } = params;
    const existingUser = await register.findUserByEmail(email);
    if (existingUser.data.length > 0) {
      res.status(400).json({
        success: false,
        message: "User already exits",
      });
    } else {
      const token = jwd.sign(
        {
          user_name: firstname,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      const user = await register.createRegister(params);
      res.status(200).json({
        success: true,
        data: {
          userName: firstname,
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

router.post("/login", async (req, res, next) => {
  try {
    const params = req.body;

    if (Object.values(params).length === 0) {
      res.status(400).json({
        success: false,
        message: "No user is provided",
      });
    }
    const { email, password, firstname } = params;
    const existingUser = await register.findUserByEmail(email);
    if (existingUser.data.length === 0) {
      res.status(400).json({
        success: false,
        message: "User does not exit",
      });
    } else {
      // password shalgana
      // bcrypt zadalna

      if (await bcrypt.compare(password, existingUser.data[0].password)) {
        const token = jwd.sign(
          {
            user_name: existingUser.data[0].firstname,
            email,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({
          success: true,
          data: {
            email: email,
            firstname: existingUser.data[0].firstname,
          },
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
module.exports = router;
