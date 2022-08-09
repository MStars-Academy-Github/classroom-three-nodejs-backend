const express = require("express");

const router = express.Router();

const foods = require("../service/foods");

router.get("/", async (req, res, next) => {
  try {
    res.json(await foods.getAllfoods());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
router.post("/addfood", async (req, res, next) => {
  const params = req.body;
  console.log(params);
  try {
    res.json(await foods.createFoods(params));
  } catch (err) {
    console.log(err);
  }
});
router.delete("/delete", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await foods.deleteFoods(params));
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.put("/update", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.updateFoods(params));
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await foods.getFoodById(id));
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
