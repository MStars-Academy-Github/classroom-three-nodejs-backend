const express = require("express");
const router = express.Router();
const foods = require("../service/users");

router.get("/", async (req, res, next) => {
  try {
    res.json(await foods.getAllUsers());
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.createUsers(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
