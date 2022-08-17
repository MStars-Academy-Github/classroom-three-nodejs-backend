const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());

const register = express.Router();
app.use("/api", register);
const jwt = require("jsonwebtoken");
const reg = require("../service/register");
const userService = require("../service/userService");

register.post("/login", async (req, res, next) => {
  try {
    const params = req.body;
    if (Object.values(params).length === 0) {
      res.status(400).json({
        success: false,
        message: "no user data",
      });
    }
    const { email, password, firstname, lastname, address, phone_number } =
      params;
    console.log(params);
    const existingUser = await userService.findUserbyEmail(email);
    if (existingUser.data.length === 0) {
      res.status(400).json({
        success: false,
        message: "User does not exist, pls register first",
      });
    } else {
      if (await bcrypt.compare(password, existingUser.data[0].password)) {
        const token = jwt.sign(
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
            lastname: existingUser.data[0].lastname,
            address: existingUser.data[0].address,
            phone_number: existingUser.data[0].phone_number,
          },
          token: token,
        });
        // console.log(data);
        // console.log(existingUser.data[0].phone_number);
        // console.log(token);
      } else {
        res.status(401).json({
          success: false,
          data: "Email or password do not match",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

register.post("/register", async (req, res, next) => {
  try {
    const params = req.body;
    if (
      Object.values(params).length === 0 &&
      Object.keys(params).length === 0
    ) {
      res.status(400).json({
        success: false,
        message: "No user data is provided",
      });
    }
    const { email, firstname } = params;
    const existingUser = await userService.findUserbyEmail(email);
    if (existingUser.data.length > 0) {
      res.status(400).json({
        success: false,
        message: "user email is already exist",
      });
    } else {
      const token = jwt.sign(
        {
          user_name: firstname,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      console.log(token);
      const user = await reg.registerUser(params);
      res.status(200).json({
        success: true,
        data: {
          userName: firstname,
          email: email,
        },
        token: token,
      });
    }

    const user = await reg.registerUser(params);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = register;
