const express = require("express");
const router = express.Router();
const foods = require("../services/foods");

router.get("/", async (req, res, next) => {
  try {
    res.json(await foods.getAllFoods());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await foods.createFood({ params }));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
