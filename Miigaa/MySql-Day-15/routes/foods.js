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
router.post("/add", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await foods.createFood(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await foods.getFoodById(id));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.put("/update", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.updateFood(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
router.delete("/delete", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.deleteFood(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
module.exports = router;
