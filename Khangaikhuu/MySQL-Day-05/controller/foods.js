const express = require("express");
const router = express.Router();
const foods = require("../services/foods");
const categories = require("../services/categories");

router.get("/", async (req, res, next) => {
  try {
    res.json(await foods.getAllFoods());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
