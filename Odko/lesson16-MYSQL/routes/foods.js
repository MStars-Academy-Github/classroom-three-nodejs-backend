const express = require("express");
const router = express.Router();

const foods = require("../services/foods");

router.get("/", async (req, res, next) => {
  try {
    res.json(await foods.getAllFood());
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
});

module.exports = router;
