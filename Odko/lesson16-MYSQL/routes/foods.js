const express = require("express");
const router = express.Router();

const foods = require("../services/foods");

// router.get("/", async (req, res, next) => {
//   try {
//     res.json(await foods.getAllFood());
//   } catch (err) {
//     console.error(err.messeage);
//     next(err);
//   }
// });
router.get("/", async (req, res, next) => {
  try {
    res.json(await foods.getFoodJoinFood());
  } catch (err) {
    console.error(err.messeage);
    next(err);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    const params = req.query;

    res.json(await foods.deleteFood(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.createFood(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.json(await foods.getFoodById(id));
  } catch (err) {
    console.error(error.message);
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.updateFood(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
module.exports = router;
