const express = require("express");
const router = express.Router();
const register = require("../services/register");

router.post("/register", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    const user = await register.registerUser(params);
    res.json("Its register");
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
