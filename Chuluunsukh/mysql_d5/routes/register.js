const express = require("express");
const { registerUser } = require("../service/register");
const router = express.Router();
const userService = require("../service/userService");

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
    const { email } = params;
    const existUser = await userService.findUserByEmail(email);
    if (existUser.data.length > 0) {
      res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
    console.log(existUser);
    // call register service
    const user = await register.registerUser(params);
    res.json("It's register side");
  } catch {
    error;
  }
  {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
