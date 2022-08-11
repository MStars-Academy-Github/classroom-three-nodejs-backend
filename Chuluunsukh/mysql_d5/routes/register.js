const express = require("express");
const { registerUser } = require("../service/register");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    if (Object.values(params).length === 0) {
      res.statusCode(400).json({
        success: false,
        message: "No user data is provided",
      });
    }
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
