const express = require("express");
const register = require("../service/register");
const router = express.Router();
const userService = require("../service/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
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
      if (await bcrypt.compare(password, existUser.data[0].password)) {
        const token = jwt.sign(
          { userName: existUser.data[0].firstName, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2hr",
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
          data: "Email or Password doesn't match!",
        });
      }
      next();
    }
    res.status(200).json("user login");
  } catch (error) {
    console.error(error);
  }
});

router.delete("/delete-user", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await users.deleteUser(params));
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const params = req.body;
    // when the request body is empty object
    if (Object.values(params).length === 0) {
      res.statusCode(400).json({
        success: false,
        message: "No user data is provided",
      });
    }
    // check the email address already exist in DB
    const { email, firstName } = params;
    console.log(email);
    console.log(firstName);
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
  } catch (error) {
    console.error(error.message);
    next(error);
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
