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
router.delete("/", async (req, res, next) => {
  try {
    const params = req.query._id;
    res.json(await foods.deleteFood(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
module.exports = router;
